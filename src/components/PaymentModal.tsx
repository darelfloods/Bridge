import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, CheckCircle, XCircle, Loader2, ShieldCheck } from 'lucide-react';

interface Offer {
  id: number;
  title: string;
  price: string;
  amount: number; // en FCFA
}

interface PaymentModalProps {
  offer: Offer | null;
  onClose: () => void;
}

type Step = 'select' | 'phone' | 'processing' | 'waiting' | 'success' | 'error';

const PROVIDERS = [
  {
    id: 'AIRTEL_GAB',
    name: 'Airtel Money',
    color: '#E40000',
    bg: '#fff0f0',
    logo: '🔴',
    prefix: '+241',
  },
  {
    id: 'MOOV_GAB',
    name: 'Moov Money',
    color: '#0066CC',
    bg: '#f0f6ff',
    logo: '🔵',
    prefix: '+241',
  },
];

export function PaymentModal({ offer, onClose }: PaymentModalProps) {
  const [step, setStep] = useState<Step>('select');
  const [provider, setProvider] = useState<(typeof PROVIDERS)[0] | null>(null);
  const [phone, setPhone] = useState('');
  const [depositId, setDepositId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!offer) return null;

  /* ─── Handlers ─── */
  const handleSelectProvider = (p: (typeof PROVIDERS)[0]) => {
    setProvider(p);
    setStep('phone');
  };

  const handleSubmitPhone = async () => {
    if (phone.replace(/\s/g, '').length < 8) {
      setErrorMsg('Veuillez entrer un numéro valide.');
      return;
    }
    setErrorMsg('');
    setStep('processing');

    try {
      const res = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phone.replace(/\s/g, ''),
          provider: provider!.id,
          amount: offer.amount,
          offerId: offer.id,
          offerTitle: offer.title,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur serveur');

      setDepositId(data.depositId);
      setStep('waiting');

      // Polling toutes les 5s pour vérifier le statut
      const interval = setInterval(async () => {
        try {
          const statusRes = await fetch(`/api/payment-status/${data.depositId}`);
          const statusData = await statusRes.json();
          if (statusData.status === 'COMPLETED') {
            clearInterval(interval);
            setStep('success');
          } else if (statusData.status === 'FAILED' || statusData.status === 'REJECTED') {
            clearInterval(interval);
            setErrorMsg(statusData.reason || 'Paiement refusé.');
            setStep('error');
          }
        } catch {
          // Continue polling
        }
      }, 5000);

      // Timeout après 3 minutes
      setTimeout(() => {
        clearInterval(interval);
        if (step === 'waiting') {
          setErrorMsg('Délai dépassé. Vérifiez votre téléphone et réessayez.');
          setStep('error');
        }
      }, 180000);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Une erreur est survenue.');
      setStep('error');
    }
  };

  const reset = () => {
    setStep('select');
    setProvider(null);
    setPhone('');
    setDepositId(null);
    setErrorMsg('');
  };

  /* ─── UI ─── */
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Card */}
        <motion.div
          className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
          style={{ background: '#FAFAF8' }}
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ type: 'spring', damping: 24, stiffness: 300 }}
        >
          {/* Header */}
          <div
            className="px-7 pt-7 pb-5"
            style={{ background: 'linear-gradient(135deg, #1C1C1C 0%, #2d2d2d 100%)' }}
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#C9A84C' }}>
              Paiement sécurisé
            </p>
            <h3 className="text-xl font-bold text-white leading-snug">{offer.title}</h3>
            <div
              className="inline-flex items-center gap-1 mt-2 text-sm font-black px-4 py-1.5 rounded-full"
              style={{ background: '#C9A84C', color: '#1C1C1C' }}
            >
              {offer.price}
            </div>
          </div>

          {/* Body */}
          <div className="px-7 py-6">
            {/* STEP: select */}
            {step === 'select' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <p className="text-sm font-semibold text-gray-500 mb-4">
                  Choisissez votre opérateur Mobile Money
                </p>
                <div className="flex flex-col gap-3">
                  {PROVIDERS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelectProvider(p)}
                      className="flex items-center gap-4 p-4 rounded-2xl border-2 border-transparent hover:border-current transition-all group text-left"
                      style={{ background: p.bg }}
                    >
                      <span className="text-3xl">{p.logo}</span>
                      <div>
                        <p className="font-bold text-base" style={{ color: p.color }}>
                          {p.name}
                        </p>
                        <p className="text-xs text-gray-400">Paiement instantané · Gabon</p>
                      </div>
                      <span
                        className="ml-auto text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: p.color, color: '#fff' }}
                      >
                        Choisir →
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-5 text-xs text-gray-400">
                  <ShieldCheck size={14} />
                  Paiement chiffré et sécurisé via pawaPay
                </div>
              </motion.div>
            )}

            {/* STEP: phone */}
            {step === 'phone' && provider && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <button onClick={() => setStep('select')} className="text-xs text-gray-400 hover:text-gray-700 mb-4 flex items-center gap-1">
                  ← Changer d'opérateur
                </button>
                <div
                  className="flex items-center gap-3 p-3 rounded-xl mb-5"
                  style={{ background: provider.bg }}
                >
                  <span className="text-2xl">{provider.logo}</span>
                  <span className="font-bold" style={{ color: provider.color }}>
                    {provider.name}
                  </span>
                </div>

                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Numéro de téléphone
                </label>
                <div className="flex items-center border-2 rounded-xl overflow-hidden mb-2"
                  style={{ borderColor: errorMsg ? '#ef4444' : '#e5e7eb' }}>
                  <span className="px-3 py-3 text-sm font-bold text-gray-500 bg-gray-100 border-r border-gray-200">
                    {provider.prefix}
                  </span>
                  <div className="flex items-center px-3 gap-2 flex-1">
                    <Phone size={16} className="text-gray-400" />
                    <input
                      type="tel"
                      className="flex-1 py-3 outline-none text-base bg-transparent"
                      placeholder="07 XX XX XX"
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value); setErrorMsg(''); }}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmitPhone()}
                      autoFocus
                    />
                  </div>
                </div>
                {errorMsg && <p className="text-xs text-red-500 mb-3">{errorMsg}</p>}
                <p className="text-xs text-gray-400 mb-5">
                  Vous recevrez une notification push sur votre téléphone pour confirmer le paiement.
                </p>
                <button
                  onClick={handleSubmitPhone}
                  className="w-full py-3.5 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-95"
                  style={{ background: provider.color, color: '#fff' }}
                >
                  Payer avec {provider.name}
                </button>
              </motion.div>
            )}

            {/* STEP: processing */}
            {step === 'processing' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <Loader2 size={48} className="animate-spin mx-auto mb-4" style={{ color: '#C9A84C' }} />
                <p className="font-bold text-gray-700">Initialisation du paiement…</p>
                <p className="text-sm text-gray-400 mt-1">Connexion à {provider?.name}</p>
              </motion.div>
            )}

            {/* STEP: waiting */}
            {step === 'waiting' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-6"
              >
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl animate-pulse"
                  style={{ background: provider?.bg }}
                >
                  {provider?.logo}
                </div>
                <p className="font-bold text-lg text-gray-800">Confirmez sur votre téléphone</p>
                <p className="text-sm text-gray-500 mt-2 mb-4">
                  Une notification a été envoyée au<br />
                  <span className="font-bold text-gray-700">{provider?.prefix} {phone}</span>
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <Loader2 size={12} className="animate-spin" />
                  En attente de confirmation…
                </div>
                {depositId && (
                  <p className="text-xs text-gray-300 mt-3">Réf: {depositId.slice(0, 12)}…</p>
                )}
              </motion.div>
            )}

            {/* STEP: success */}
            {step === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle size={64} className="mx-auto mb-4" style={{ color: '#22c55e' }} />
                <p className="font-bold text-xl text-gray-800">Paiement confirmé !</p>
                <p className="text-sm text-gray-500 mt-2 mb-6">
                  Votre réservation pour <strong>{offer.title}</strong> a bien été enregistrée.
                  Notre équipe vous contactera sous 24h.
                </p>
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl font-bold text-sm"
                  style={{ background: '#22c55e', color: '#fff' }}
                >
                  Fermer
                </button>
              </motion.div>
            )}

            {/* STEP: error */}
            {step === 'error' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-6"
              >
                <XCircle size={56} className="mx-auto mb-4 text-red-500" />
                <p className="font-bold text-lg text-gray-800">Paiement échoué</p>
                <p className="text-sm text-red-500 mt-1 mb-6">{errorMsg}</p>
                <div className="flex gap-3">
                  <button
                    onClick={reset}
                    className="flex-1 py-3 rounded-xl font-bold text-sm border-2 border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Réessayer
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 rounded-xl font-bold text-sm"
                    style={{ background: '#1C1C1C', color: '#fff' }}
                  >
                    Fermer
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
