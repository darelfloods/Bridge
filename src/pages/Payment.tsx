import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { motion } from 'motion/react';
import { MessageCircle, Smartphone, CheckCircle, Send } from 'lucide-react';

export function Payment() {
  const paymentImage =
    '/whatsapp-phone.jpg';

  const steps = [
    {
      number: 1,
      icon: <MessageCircle className="w-12 h-12" />,
      title: "Contacter l'entreprise",
      description:
        "Discutez de votre projet sur WhatsApp et choisissez le service souhaité. Nous vous confirmerons les détails et le montant exact.",
    },
    {
      number: 2,
      icon: <Smartphone className="w-12 h-12" />,
      title: 'Effectuer le paiement',
      description: "Utilisez Airtel Money pour effectuer le paiement du montant convenu vers notre numéro.",
    },
    {
      number: 3,
      icon: <CheckCircle className="w-12 h-12" />,
      title: 'Confirmer le paiement',
      description: "Prenez une capture d'écran du reçu de paiement Airtel Money.",
    },
    {
      number: 4,
      icon: <Send className="w-12 h-12" />,
      title: 'Envoyer la preuve',
      description:
        "Envoyez la capture d'écran sur WhatsApp. Nous validerons votre paiement et démarrerons le service.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={paymentImage} alt="Payment" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(28,28,28,0.80), rgba(28,28,28,0.50), transparent)' }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Comment payer ?</h1>
            <p className="text-2xl max-w-3xl">Un processus simple et sécurisé pour régler vos services</p>
          </motion.div>
        </div>
      </section>

      {/* Payment Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#1C1C1C' }}>Le processus de paiement</h2>
            <p className="text-xl text-gray-600">Suivez ces 4 étapes simples pour effectuer votre paiement</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 text-center h-full">
                  <div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl text-white"
                    style={{ background: '#C9A84C' }}
                  >
                    {step.number}
                  </div>
                  <div className="mb-6 flex justify-center mt-6" style={{ color: '#C9A84C' }}>{step.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4" style={{ color: '#1C1C1C' }}>{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Information */}
      <section className="py-20" style={{ background: '#F5F3EE' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-lg shadow-xl"
          >
            <h2 className="text-4xl font-bold mb-10 text-center" style={{ color: '#1C1C1C' }}>
              Informations de paiement Airtel Money
            </h2>

            <div className="space-y-8">
              <div className="pl-8" style={{ borderLeft: '4px solid #C9A84C' }}>
                <h3 className="font-semibold text-xl mb-3" style={{ color: '#1C1C1C' }}>Numéro Airtel Money</h3>
                <p className="text-3xl font-bold" style={{ color: '#1C1C1C' }}>+241 160 354 192</p>
              </div>

              <div className="pl-8" style={{ borderLeft: '4px solid #C9A84C' }}>
                <h3 className="font-semibold text-xl mb-3" style={{ color: '#1C1C1C' }}>Nom du bénéficiaire</h3>
                <p className="text-2xl font-semibold text-gray-800">The Bridge Consulting</p>
              </div>

              <div className="p-6 mt-8 rounded-lg" style={{ background: '#FBF7EE', borderLeft: '4px solid #C9A84C' }}>
                <h4 className="font-semibold mb-3 text-lg flex items-center gap-2" style={{ color: '#1C1C1C' }}>
                  <span style={{ color: '#C9A84C' }}>&#9888;</span>
                  Important
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>&#8226; Vérifiez toujours le numéro avant d'effectuer le paiement</li>
                  <li>&#8226; Conservez votre reçu de transaction</li>
                  <li>&#8226; Envoyez la preuve de paiement sur WhatsApp immédiatement</li>
                  <li>&#8226; Le service démarrera après validation de votre paiement</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How to Pay with Airtel Money */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: '#1C1C1C' }}>
              Comment utiliser Airtel Money
            </h2>

            <div className="bg-white rounded-lg shadow-lg p-10">
              <h3 className="font-semibold text-2xl mb-8" style={{ color: '#1C1C1C' }}>Instructions de paiement :</h3>
              <ol className="space-y-4 text-gray-700 text-lg">
                <li className="flex gap-4">
                  <span className="font-bold flex-shrink-0" style={{ color: '#C9A84C' }}>1.</span>
                  <span>Composez <strong>*555#</strong> depuis votre téléphone Airtel</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold flex-shrink-0" style={{ color: '#C9A84C' }}>2.</span>
                  <span>Sélectionnez <strong>"Transfert d'argent"</strong></span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold flex-shrink-0" style={{ color: '#C9A84C' }}>3.</span>
                  <span>Choisissez <strong>"Vers Airtel Money"</strong></span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold flex-shrink-0" style={{ color: '#C9A84C' }}>4.</span>
                  <span>Entrez le numéro : <strong>+241 160 354 192</strong></span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold flex-shrink-0" style={{ color: '#C9A84C' }}>5.</span>
                  <span>Entrez le montant convenu</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold flex-shrink-0" style={{ color: '#C9A84C' }}>6.</span>
                  <span>Confirmez avec votre code PIN</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold flex-shrink-0" style={{ color: '#C9A84C' }}>7.</span>
                  <span>Prenez une capture d'écran du message de confirmation</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold flex-shrink-0" style={{ color: '#C9A84C' }}>8.</span>
                  <span>Envoyez la capture sur WhatsApp</span>
                </li>
              </ol>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-white" style={{ background: '#1C1C1C' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Besoin d'aide pour le paiement ?</h2>
          <p className="text-xl mb-10 text-gray-400 leading-relaxed">
            Notre équipe est disponible sur WhatsApp pour vous assister à chaque étape du processus
          </p>
          <WhatsAppButton
            message="Bonjour, j'ai besoin d'aide pour effectuer un paiement."
            className="text-lg px-10 py-4 shadow-xl"
          >
            Obtenir de l'aide
          </WhatsAppButton>
        </div>
      </section>

      <Footer />
    </div>
  );
}
