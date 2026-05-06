import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* ──────────────────────────────
   Configuration SingPay
   Doc : https://client.singpay.ga/doc/reference/index.html
   Host : https://gateway.singpay.ga/v1
────────────────────────────── */
const SINGPAY_BASE_URL = process.env.SINGPAY_BASE_URL || 'https://gateway.singpay.ga/v1';
const SINGPAY_CLIENT_ID = process.env.SINGPAY_CLIENT_ID || '';
const SINGPAY_CLIENT_SECRET = process.env.SINGPAY_CLIENT_SECRET || '';
const SINGPAY_WALLET_ID = process.env.SINGPAY_WALLET_ID || '';
const SINGPAY_DISBURSEMENT_ID = process.env.SINGPAY_DISBURSEMENT_ID || '';

// AIRTEL_GAB → /74/paiement | MOOV_GAB → /62/paiement
const PROVIDER_ENDPOINTS: Record<string, string> = {
  AIRTEL_GAB: '/74/paiement',
  MOOV_GAB: '/62/paiement',
};

// Store mémoire (en prod → DB)
type PaymentRecord = {
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REJECTED';
  reason?: string;
  reference?: string;
};
const paymentStore: Record<string, PaymentRecord> = {};

/* Map du résultat SingPay → statut frontend */
function mapSingpayStatus(transaction: any): PaymentRecord {
  if (!transaction) return { status: 'PENDING' };
  const { status, result } = transaction;

  if (status === 'Terminate') {
    if (result === 'Success') return { status: 'COMPLETED' };
    const reason =
      result === 'PasswordError' ? 'Code PIN incorrect.' :
      result === 'BalanceError' ? 'Solde insuffisant.' :
      result === 'TimeOutError' ? 'Délai dépassé sans confirmation.' :
      'Paiement refusé.';
    return { status: 'FAILED', reason };
  }
  return { status: 'PENDING' };
}

const singpayHeaders = () => ({
  'Content-Type': 'application/json',
  'x-client-id': SINGPAY_CLIENT_ID,
  'x-client-secret': SINGPAY_CLIENT_SECRET,
  'x-wallet': SINGPAY_WALLET_ID,
});

/* ──────────────────────────────
   POST /api/pay
   Initie un paiement via SingPay (USSD Push)
────────────────────────────── */
app.post('/api/pay', async (req, res) => {
  const { phone, provider, amount, offerTitle } = req.body;

  if (!phone || !provider || !amount) {
    return res.status(400).json({ message: 'Paramètres manquants.' });
  }

  const endpoint = PROVIDER_ENDPOINTS[provider];
  if (!endpoint) {
    return res.status(400).json({ message: 'Opérateur non supporté.' });
  }

  if (!SINGPAY_CLIENT_ID || !SINGPAY_CLIENT_SECRET || !SINGPAY_WALLET_ID) {
    return res.status(500).json({
      message: 'SingPay non configuré (CLIENT_ID / CLIENT_SECRET / WALLET_ID manquant).',
    });
  }

  // Format MSISDN attendu par SingPay : +241XXXXXXXX (8 chiffres après +241)
  // L'utilisateur peut saisir "077123456" (avec 0 local) → on retire le 0 initial
  let cleanedPhone = String(phone).replace(/\D/g, '');
  if (cleanedPhone.startsWith('241')) cleanedPhone = cleanedPhone.slice(3);
  if (cleanedPhone.startsWith('0')) cleanedPhone = cleanedPhone.slice(1);
  const msisdn = `+241${cleanedPhone}`;

  const reference = uuidv4();
  const body: Record<string, any> = {
    amount: Number(amount),
    reference,
    client_msisdn: msisdn,
    portefeuille: SINGPAY_WALLET_ID,
    isTransfer: false,
  };
  if (SINGPAY_DISBURSEMENT_ID) body.disbursement = SINGPAY_DISBURSEMENT_ID;

  try {
    const response = await fetch(`${SINGPAY_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: singpayHeaders(),
      body: JSON.stringify(body),
    });

    const rawText = await response.text();
    let data: any = {};
    try { data = rawText ? JSON.parse(rawText) : {}; } catch { /* SingPay renvoie parfois du text/html */ }

    if (!response.ok || data?.status?.success === false) {
      const message =
        data?.status?.message ||
        data?.message ||
        (rawText && rawText.length < 300 ? rawText.trim() : 'Erreur SingPay.');
      console.error(`SingPay error [${response.status}]:`, message);
      return res.status(502).json({ message });
    }

    const transactionId: string | undefined = data?.transaction?.id || data?.transaction?._id;
    if (!transactionId) {
      console.error('SingPay sans transaction.id:', data);
      return res.status(502).json({ message: 'Réponse SingPay invalide.' });
    }

    paymentStore[transactionId] = { status: 'PENDING', reference };

    console.log(`SingPay → push ${provider} envoyé (${transactionId}) pour ${offerTitle}`);
    return res.json({ depositId: transactionId, reference, status: 'ACCEPTED' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erreur serveur interne.' });
  }
});

/* ──────────────────────────────
   GET /api/payment-status/:id
   Polling depuis le frontend
────────────────────────────── */
app.get('/api/payment-status/:id', async (req, res) => {
  const { id } = req.params;

  // Si le webhook a déjà mis à jour le store → on renvoie tel quel
  const cached = paymentStore[id];
  if (cached && cached.status !== 'PENDING') return res.json(cached);

  // Sinon on interroge SingPay directement
  try {
    const response = await fetch(`${SINGPAY_BASE_URL}/transaction/api/status/${id}`, {
      headers: {
        'x-client-id': SINGPAY_CLIENT_ID,
        'x-client-secret': SINGPAY_CLIENT_SECRET,
      },
    });
    const data: any = await response.json().catch(() => ({}));
    const mapped = mapSingpayStatus(data?.transaction);
    paymentStore[id] = { ...paymentStore[id], ...mapped };
    return res.json(mapped);
  } catch {
    return res.json({ status: 'PENDING' });
  }
});

/* ──────────────────────────────
   POST /api/payment-callback
   Webhook SingPay (configurable côté Workspace)
────────────────────────────── */
app.post('/api/payment-callback', (req, res) => {
  const transaction = req.body?.transaction || req.body;
  const id = transaction?.id || transaction?._id;
  if (id) {
    const mapped = mapSingpayStatus(transaction);
    paymentStore[id] = { ...paymentStore[id], ...mapped };
    console.log(`Callback SingPay reçu — ${id}: ${mapped.status}`);
  }
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur paiement SingPay démarré sur http://localhost:${PORT}`);
});
