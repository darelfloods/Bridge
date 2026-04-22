import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export function Contact() {
  const contactImage =
    '/african-city-hd.jpg';

  const contactInfo = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: 'Téléphone / WhatsApp',
      content: '+241 60354192',
      description: 'Disponible pour vos appels et messages',
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: 'Email',
      content: 'thebridgellc95@gmail.com',
      description: 'Envoyez-nous un email, nous répondons sous 24h',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Horaires de disponibilité',
      content: 'Lundi - Samedi',
      description: '8h00 - 20h00 (GMT+1)',
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Localisation',
      content: 'Gabon & Nigeria',
      description: 'Présence locale pour mieux vous servir',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[340px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={contactImage} alt="Contact" className="w-full h-full object-cover" />
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Contactez-nous</h1>
            <p className="text-2xl max-w-3xl">
              Notre équipe est à votre écoute pour répondre à toutes vos questions
            </p>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-16 text-white" style={{ background: '#1C1C1C' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <MessageCircle className="w-12 h-12 mx-auto mb-4" style={{ color: '#C9A84C' }} />
            <h2 className="text-3xl font-bold mb-4">La méthode la plus rapide : WhatsApp</h2>
            <p className="text-lg mb-8 text-gray-400 leading-relaxed">
              Obtenez une réponse immédiate en discutant directement avec notre équipe
            </p>
            <WhatsAppButton className="text-lg px-10 py-4 shadow-xl">
              Nous écrire sur WhatsApp
            </WhatsAppButton>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#1C1C1C' }}>Nos coordonnées</h2>
            <p className="text-xl text-gray-600">
              Plusieurs moyens de nous contacter selon votre préférence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 text-center"
              >
                <div className="mb-6 flex justify-center" style={{ color: '#C9A84C' }}>{info.icon}</div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#1C1C1C' }}>{info.title}</h3>
                <p className="text-2xl font-bold mb-3" style={{ color: '#1C1C1C' }}>{info.content}</p>
                <p className="text-sm text-gray-600">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20" style={{ background: '#F5F3EE' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: '#1C1C1C' }}>Questions fréquentes</h2>

            <div className="space-y-6">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="font-semibold text-xl mb-3" style={{ color: '#1C1C1C' }}>
                  Comment obtenir un devis pour un service ?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Contactez-nous sur WhatsApp en précisant le service qui vous intéresse. Nous vous fournirons
                  un devis détaillé dans les plus brefs délais.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="font-semibold text-xl mb-3" style={{ color: '#1C1C1C' }}>Quel est le délai de réponse ?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Sur WhatsApp, nous répondons généralement en quelques minutes pendant nos horaires
                  d'ouverture. Par email, comptez 24h maximum.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="font-semibold text-xl mb-3" style={{ color: '#1C1C1C' }}>Puis-je payer en plusieurs fois ?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Oui, pour certains services, nous proposons des facilités de paiement. Discutez-en avec nous
                  sur WhatsApp pour trouver la meilleure solution.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="font-semibold text-xl mb-3" style={{ color: '#1C1C1C' }}>
                  Organisez-vous des voyages pour des groupes ?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Absolument ! Nous organisons des voyages d'affaires individuels et en groupe. Contactez-nous
                  pour un devis personnalisé.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 text-white" style={{ background: '#1C1C1C' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Prêt à commencer votre projet ?</h2>
          <p className="text-xl mb-10 text-gray-400 leading-relaxed">
            N'attendez plus, contactez-nous dès maintenant et concrétisons ensemble vos ambitions
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <WhatsAppButton className="text-lg px-10 py-4 shadow-xl">WhatsApp</WhatsAppButton>
            <a
              href="mailto:thebridgellc95@gmail.com"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-lg transition-all text-lg font-semibold shadow-xl hover:brightness-110"
              style={{ background: '#C9A84C', color: '#1C1C1C' }}
            >
              <Mail size={20} />
              Envoyer un email
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
