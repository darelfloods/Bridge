import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { Play, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useRef } from 'react';

const heroImage = '/business-handshake-hd.jpg';

const visites = [
  {
    id: 1,
    src: '/visite-nigeria.mp4',
    title: 'Visite terrain — Nigeria',
    description: 'Découverte des opportunités commerciales et rencontres avec nos partenaires sur place.',
  },
  {
    id: 2,
    src: '/visite-nigeria-2.mp4',
    title: 'Visite terrain — Nigeria',
    description: 'Exploration des marchés et centres de production pour nos clients.',
  },
];

function VisiteCard({ visite, index }: { visite: typeof visites[0]; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
    >
      <div
        className="relative aspect-[9/16] cursor-pointer group"
        onClick={handlePlay}
      >
        <video
          ref={videoRef}
          src={visite.src}
          className="w-full h-full object-cover"
          playsInline
          controls={isPlaying}
          onEnded={() => setIsPlaying(false)}
        />
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <Play size={28} className="ml-1" style={{ color: '#1C1C1C' }} />
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2" style={{ color: '#1C1C1C' }}>{visite.title}</h3>
        <p className="text-gray-600">{visite.description}</p>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[340px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Visite et témoignages" className="w-full h-full object-cover object-center" />
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Visite & Témoignages</h1>
            <p className="text-2xl max-w-2xl">
              Découvrez nos visites sur le terrain et les retours de nos clients
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visite Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1C1C1C' }}>
              Nos visites sur le terrain
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Suivez-nous lors de nos voyages d'affaires au Nigeria
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {visites.map((visite, i) => (
              <VisiteCard key={visite.id} visite={visite} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <WhatsAppButton
              message="Bonjour, je souhaite participer à une prochaine visite au Nigeria."
              className="px-10 py-4 text-lg"
            >
              Réserver ma place pour la prochaine visite
            </WhatsAppButton>
          </motion.div>
        </div>
      </section>

      {/* Témoignages Section */}
      <section className="py-16" style={{ background: '#F5F3EE' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1C1C1C' }}>
              Témoignages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              Les retours de nos clients arrivent bientôt
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-12 text-center shadow-md"
            style={{ border: '2px dashed #C9A84C66' }}
          >
            <MessageCircle size={48} className="mx-auto mb-6" style={{ color: '#C9A84C' }} />
            <h3 className="text-2xl font-semibold mb-4" style={{ color: '#1C1C1C' }}>
              Vous êtes un client The Bridge ?
            </h3>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto text-lg leading-relaxed">
              Partagez votre expérience et aidez d'autres entrepreneurs à franchir le pas.
              Envoyez-nous votre témoignage via WhatsApp.
            </p>
            <WhatsAppButton
              message="Bonjour, je souhaite partager mon témoignage en tant que client The Bridge."
              className="px-8 py-3 text-lg"
            >
              Envoyer mon témoignage
            </WhatsAppButton>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-white" style={{ background: '#1C1C1C' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Rejoignez nos clients satisfaits
            </h2>
            <p className="text-xl mb-10 text-gray-400 leading-relaxed">
              Commencez votre aventure avec The Bridge et écrivez votre propre success story en Afrique
            </p>
            <WhatsAppButton
              message="Bonjour, je souhaite démarrer un projet avec The Bridge."
              className="text-lg px-10 py-4 shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
