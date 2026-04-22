import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PAWAPAY_BASE_URL = process.env.PAWAPAY_BASE_URL || 'https://api.sandbox.pawapay.io';
const PAWAPAY_TOKEN = process.env.PAWAPAY_TOKEN || 'YOUR_SANDBOX_TOKEN_HERE';

// Store temporaire pour les statuts (en prod → base de données)
const paymentStore: Record<string, { status: string; reason?: string }> = {};

/* ──────────────────────────────
   POST /api/pay
   Initie un dépôt via pawaPay
────────────────────────────── */
app.post('/api/pay', async (req, res) => {
  const { phone, provider, amount, offerTitle } = req.body;

  if (!phone || !provider || !amount) {
    return res.status(400).json({ message: 'Paramètres manquants.' });
  }

  const depositId = uuidv4();

  const body = {
    depositId,
    returnUrl: `${process.env.CALLBACK_URL || 'http://localhost:3001'}/api/payment-callback`,
    amount: String(amount),
    currency: 'XAF',
    correspondent: provider, // ex: "AIRTEL_GAB" ou "MOOV_GAB"
    payer: {
      type: 'MSISDN',
      address: { value: phone },
    },
    customerTimestamp: new Date().toISOString(),
    statementDescription: `Bridge - ${offerTitle}`.slice(0, 22),
  };

  try {
    const response = await fetch(`${PAWAPAY_BASE_URL}/deposits`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAWAPAY_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('pawaPay error:', data);
      return res.status(502).json({ message: data.message || 'Erreur pawaPay.' });
    }

    // On stocke le statut initial
    paymentStore[depositId] = { status: 'ACCEPTED' };

    return res.json({ depositId, status: 'ACCEPTED' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erreur serveur interne.' });
  }
});

/* ──────────────────────────────
   GET /api/payment-status/:id
   Polling du statut
────────────────────────────── */
app.get('/api/payment-status/:id', async (req, res) => {
  const { id } = req.params;

  // D'abord vérifier dans le store local (mis à jour par webhook)
  if (paymentStore[id]) {
    return res.json(paymentStore[id]);
  }

  // Sinon interroger pawaPay directement
  try {
    const response = await fetch(`${PAWAPAY_BASE_URL}/deposits/${id}`, {
      headers: { Authorization: `Bearer ${PAWAPAY_TOKEN}` },
    });
    const data = await response.json();
    const deposit = Array.isArray(data) ? data[0] : data;
    return res.json({ status: deposit?.status || 'PENDING', reason: deposit?.rejectionReason?.rejectionMessage });
  } catch {
    return res.json({ status: 'PENDING' });
  }
});

/* ──────────────────────────────
   POST /api/payment-callback
   Webhook pawaPay (async)
────────────────────────────── */
app.post('/api/payment-callback', (req, res) => {
  const { depositId, status, rejectionReason } = req.body;
  if (depositId) {
    paymentStore[depositId] = {
      status,
      reason: rejectionReason?.rejectionMessage,
    };
    console.log(`✅ Callback reçu — ${depositId}: ${status}`);
  }
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Serveur paiement démarré sur http://localhost:${PORT}`);
});
