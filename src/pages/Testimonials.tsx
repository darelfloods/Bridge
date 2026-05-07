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
    src: '/notre-representante-lagos.mp4',
    title: 'Notre représentante à Lagos',
    channel: 'The Bridge Consulting',
    views: '2,1 k vues',
    date: 'il y a 1 semaine',
  },
  {
    id: 2,
    src: '/suivis-etudiant-ghana.mp4',
    title: 'Suivis étudiant au Ghana',
    channel: 'The Bridge Consulting',
    views: '3,4 k vues',
    date: 'il y a 1 semaine',
  },
  {
    id: 3,
    src: '/voyage-nigeria-delegation.mp4',
    title: 'Voyage au Nigeria avec une délégation',
    channel: 'The Bridge Consulting',
    views: '5,7 k vues',
    date: 'il y a 2 semaines',
  },
  {
    id: 4,
    src: '/voyage-sur-mesure.mp4',
    title: 'Destination Nigeria — Voyage sur mesure',
    channel: 'The Bridge Consulting',
    views: '4,2 k vues',
    date: 'il y a 2 semaines',
  },
  {
    id: 5,
    src: '/visite-nigeria.mp4',
    title: 'Visite terrain — Nigeria',
    channel: 'The Bridge Consulting',
    views: '8,9 k vues',
    date: 'il y a 1 mois',
  },
  {
    id: 6,
    src: '/visite-nigeria-2.mp4',
    title: 'Exploration des marchés et centres de production',
    channel: 'The Bridge Consulting',
    views: '6,5 k vues',
    date: 'il y a 1 mois',
  },
];

function formatDuration(seconds: number): string {
  if (!isFinite(seconds) || seconds <= 0) return '';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function VisiteCard({ visite, index }: { visite: typeof visites[0]; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<string>('');

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

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(formatDuration(videoRef.current.duration));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="flex flex-col"
    >
      <div
        className="relative aspect-video cursor-pointer group overflow-hidden rounded-xl bg-gray-100"
        onClick={handlePlay}
      >
        <video
          ref={videoRef}
          src={visite.src}
          className="w-full h-full object-cover"
          playsInline
          controls={isPlaying}
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
        {!isPlaying && (
          <>
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
              <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-90 transition-all duration-200">
                <Play size={24} className="ml-1" style={{ color: '#1C1C1C' }} fill="#1C1C1C" />
              </div>
            </div>
            {duration && (
              <div className="absolute bottom-2 right-2 bg-black/85 text-white text-xs font-medium px-1.5 py-0.5 rounded">
                {duration}
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex gap-3 mt-3">
        <div className="flex-shrink-0">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden"
            style={{ background: '#1C1C1C' }}
          >
            <img src="/logo.png" alt="The Bridge" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="text-[15px] font-semibold leading-snug line-clamp-2 mb-1"
            style={{ color: '#0F0F0F' }}
          >
            {visite.title}
          </h3>
          <p className="text-[13px] text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
            {visite.channel}
          </p>
          <p className="text-[13px] text-gray-600">
            {visite.views} • {visite.date}
          </p>
        </div>
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
              Nos visites & Témoignages en vidéo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez nos missions et suivis sur le terrain en Afrique de l'Ouest
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-4 gap-y-10">
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
