import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'motion/react';
import { Phone, CheckCircle, XCircle, Loader2, ShieldCheck, ArrowLeft } from 'lucide-react';

interface Offer {
  id: number;
  title: string;
  price: string;
  amount: number;
}

type Step = 'select' | 'phone' | 'processing' | 'waiting' | 'success' | 'error';

const PROVIDERS = [
  {
    id: 'AIRTEL_GAB',
    name: 'Airtel Money',
    color: '#E40000',
    bg: '#fff0f0',
    logoSrc: '/airtel-money-logo.png',
    prefix: '+241',
  },
  {
    id: 'MOOV_GAB',
    name: 'Moov Money',
    color: '#0066CC',
    bg: '#f0f6ff',
    logoSrc: '/moov-money-logo.png',
    prefix: '+241',
  },
];

export function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const offer = location.state?.offer as Offer;

  const [step, setStep] = useState<Step>('select');
  const [provider, setProvider] = useState<(typeof PROVIDERS)[0] | null>(null);
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!offer) {
      navigate('/services');
    }
  }, [offer, navigate]);

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

      setStep('waiting');

      // Polling toutes les 5s
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
    setErrorMsg('');
  };

  const renderProviderLogo = (p: (typeof PROVIDERS)[number], size: 'md' | 'lg' = 'md') => {
    const sizeClass = size === 'lg' ? 'w-24 h-24' : 'w-16 h-16';

    return (
      <span className={`${sizeClass} rounded-xl overflow-hidden border border-black/10 shadow-sm bg-white flex items-center justify-center`}>
        <img src={p.logoSrc} alt={`Logo ${p.name}`} className="w-full h-full object-contain" />
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE] flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section gauche : Récapitulatif de l'offre */}
          <div
            className="p-8 md:p-12 lg:p-14 flex flex-col justify-between text-white relative"
            style={{ background: 'linear-gradient(135deg, #1C1C1C 0%, #2d2d2d 100%)' }}
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck size={160} />
            </div>

            <div className="relative z-10">
              <button
                onClick={() => navigate('/services')}
                className="flex items-center text-sm font-semibold mb-8 text-white/70 hover:text-white transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" /> Retour aux services
              </button>

              <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: '#C9A84C' }}>
                Récapitulatif de la commande
              </p>
              <h1 className="text-3xl font-bold leading-tight mb-8">
                {offer.title}
              </h1>

              <div className="space-y-4">
                <div className="flex justify-between items-center bg-black/20 p-4 rounded-xl">
                  <span className="text-white/80">Prix total</span>
                  <span className="text-xl font-bold" style={{ color: '#C9A84C' }}>
                    {offer.price}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-12 relative z-10 text-sm text-white/60 space-y-1">
              <p>Paiement sécurisé et chiffré par pawaPay.</p>
              <p>Aucune donnée bancaire n'est stockée sur nos serveurs.</p>
            </div>
          </div>

          {/* Section Droite : Interface de paiement */}
          <div className="p-8 md:p-12 lg:p-14 bg-white">
            <div className="max-w-md mx-auto h-full flex flex-col justify-center">
              <div className="rounded-2xl px-5 py-4 mb-7 border" style={{ background: '#FBF7EE', borderColor: '#E8D9B0' }}>
                <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#8B7355' }}>
                  Étape sécurisée
                </p>
                <p className="text-sm text-gray-700">
                  Finalisez votre réservation en quelques instants via votre opérateur mobile money.
                </p>
              </div>
              
              {/* STEP: select */}
              {step === 'select' && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Mode de paiement</h2>
                  <p className="text-sm font-medium text-gray-500 mb-6">
                    Veuillez sélectionner votre opérateur Mobile Money.
                  </p>
                  
                  <div className="space-y-4">
                    {PROVIDERS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleSelectProvider(p)}
                        className="w-full flex items-center p-4 rounded-2xl border-2 border-transparent hover:border-current transition-all group text-left"
                        style={{ background: p.bg }}
                      >
                        <span className="mr-4">{renderProviderLogo(p)}</span>
                        <div className="flex-grow">
                          <p className="font-bold text-lg" style={{ color: p.color }}>
                            {p.name}
                          </p>
                          <p className="text-xs text-gray-500">Paiement via mobile</p>
                        </div>
                        <span
                          className="text-sm font-bold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ background: p.color, color: '#fff' }}
                        >
                          Choisir
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP: phone */}
              {step === 'phone' && provider && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <button onClick={() => setStep('select')} className="text-sm font-semibold text-gray-500 hover:text-gray-900 mb-6 flex items-center">
                    <ArrowLeft size={16} className="mr-2" /> Modifier l'opérateur
                  </button>

                  <div className="flex items-center gap-4 p-4 rounded-2xl mb-8" style={{ background: provider.bg }}>
                    {renderProviderLogo(provider)}
                    <div>
                      <p className="text-sm font-medium text-gray-500">Paiement via</p>
                      <p className="text-xl font-bold" style={{ color: provider.color }}>
                        {provider.name}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Numéro de téléphone
                    </label>
                    <div className="flex items-center border-2 rounded-xl overflow-hidden focus-within:border-gray-900 transition-colors"
                      style={{ borderColor: errorMsg ? '#ef4444' : '#e5e7eb' }}>
                      <span className="px-4 py-4 text-base font-bold text-gray-600 bg-gray-50 border-r border-gray-200">
                        {provider.prefix}
                      </span>
                      <div className="flex items-center px-4 gap-3 flex-1">
                        <Phone size={20} className="text-gray-400" />
                        <input
                          type="tel"
                          className="flex-1 py-4 outline-none text-lg text-gray-900 bg-transparent placeholder-gray-300 font-medium"
                          placeholder="07 XX XX XX"
                          value={phone}
                          onChange={(e) => { setPhone(e.target.value); setErrorMsg(''); }}
                          onKeyDown={(e) => e.key === 'Enter' && handleSubmitPhone()}
                          autoFocus
                        />
                      </div>
                    </div>
                    {errorMsg && <p className="text-sm text-red-500 mt-2 font-medium">{errorMsg}</p>}
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                    Une notification push sera envoyée sur votre téléphone. Veuillez la valider avec votre code secret pour confirmer la transaction.
                  </p>

                  <button
                    onClick={handleSubmitPhone}
                    className="w-full py-4 rounded-xl font-bold text-base transition-all hover:scale-[1.02] active:scale-95 shadow-lg flex items-center justify-center gap-2"
                    style={{ background: provider.color, color: '#fff' }}
                  >
                    Confirmer et payer {offer.price}
                  </button>
                </motion.div>
              )}

              {/* STEP: processing */}
              {step === 'processing' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                  <Loader2 size={64} className="animate-spin mx-auto mb-6" style={{ color: '#C9A84C' }} />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Initialisation du paiement...</h3>
                  <p className="text-gray-500">Connexion sécurisée en cours avec {provider?.name}</p>
                </motion.div>
              )}

              {/* STEP: waiting */}
              {step === 'waiting' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                  <div
                    className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse shadow-inner"
                    style={{ background: provider?.bg }}
                  >
                    {provider && renderProviderLogo(provider, 'lg')}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Vérifiez votre téléphone</h3>
                  <p className="text-gray-600 mb-8 text-lg">
                    Validez le paiement sur le<br />
                    <span className="font-bold text-gray-900 block mt-2 text-xl tracking-wide">{provider?.prefix} {phone}</span>
                  </p>
                  <div className="inline-flex items-center gap-3 text-sm font-semibold text-gray-500 bg-gray-100 px-6 py-3 rounded-full">
                    <Loader2 size={16} className="animate-spin" />
                    En attente de confirmation
                  </div>
                </motion.div>
              )}

              {/* STEP: success */}
              {step === 'success' && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <CheckCircle size={80} className="mx-auto mb-6" style={{ color: '#22c55e' }} />
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Paiement validé</h3>
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    Merci pour votre confiance. Votre réservation pour <strong className="text-gray-900">{offer.title}</strong> a été confirmée. Notre équipe vous contactera très prochainement.
                  </p>
                  <button
                    onClick={() => navigate('/')}
                    className="w-full py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-opacity-90 transition-all"
                    style={{ background: '#22c55e', color: '#fff' }}
                  >
                    Retour à l'accueil
                  </button>
                </motion.div>
              )}

              {/* STEP: error */}
              {step === 'error' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                  <XCircle size={80} className="mx-auto mb-6 text-red-500" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Paiement non abouti</h3>
                  <p className="text-red-500 font-medium mb-8 text-lg">{errorMsg}</p>
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={reset}
                      className="w-full py-4 rounded-xl font-bold text-lg border-2 border-gray-200 text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      Réessayer
                    </button>
                    <button
                      onClick={() => navigate('/services')}
                      className="w-full py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
                      style={{ background: '#1C1C1C', color: '#fff' }}
                    >
                      Annuler
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
