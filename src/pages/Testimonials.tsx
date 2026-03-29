import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { Play } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const heroImage =
  '/business-meeting-hd.jpg';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
}

const videos: Video[] = [
  {
    id: 1,
    title: 'Jean-Pierre Moussavou — Comment The Bridge a transformé mon entreprise',
    thumbnail:
      'https://images.unsplash.com/photo-1435186376919-88c211714029?auto=format&fit=crop&w=600&q=80',
    videoUrl: '',
    duration: '4:32',
  },
  {
    id: 2,
    title: 'Aminata Diallo — 3 contrats signés au Nigeria en 6 mois',
    thumbnail:
      'https://images.unsplash.com/photo-1507207611509-ec012433ff52?auto=format&fit=crop&w=600&q=80',
    videoUrl: '',
    duration: '6:15',
  },
  {
    id: 3,
    title: 'Rodrigue Obiang — Notre expansion en Afrique de l\'Ouest',
    thumbnail:
      'https://images.unsplash.com/photo-1507207908229-c59ddb730e40?auto=format&fit=crop&w=600&q=80',
    videoUrl: '',
    duration: '5:48',
  },
  {
    id: 4,
    title: 'Marie-Claire Nzamba — Trouver les bons partenaires en Afrique',
    thumbnail:
      'https://images.unsplash.com/photo-1580795479225-c50ab8c3348d?auto=format&fit=crop&w=600&q=80',
    videoUrl: '',
    duration: '3:20',
  },
  {
    id: 5,
    title: 'Patrick Essono — Un voyage d\'affaires qui a dépassé nos attentes',
    thumbnail:
      'https://images.unsplash.com/photo-1515135385067-5516a1e38bbe?auto=format&fit=crop&w=600&q=80',
    videoUrl: '',
    duration: '7:05',
  },
  {
    id: 6,
    title: 'Sandrine Mba — Des fournisseurs fiables grâce à The Bridge',
    thumbnail:
      'https://images.unsplash.com/photo-1488763882255-3c188b9ff4d2?auto=format&fit=crop&w=600&q=80',
    videoUrl: '',
    duration: '4:50',
  },
  {
    id: 7,
    title: 'Hervé Nguema — Premier contrat nigérian en un temps record',
    thumbnail:
      'https://images.unsplash.com/photo-1758519289366-b90c073df4a7?auto=format&fit=crop&w=600&q=80',
    videoUrl: '',
    duration: '5:12',
  },
  {
    id: 8,
    title: 'Cécile Ondo — Investisseurs et partenaires stratégiques',
    thumbnail:
      'https://images.unsplash.com/photo-1440558899941-2b58b4b0e6ad?auto=format&fit=crop&w=600&q=80',
    videoUrl: '',
    duration: '6:30',
  },
];

function VideoCard({ video, index }: { video: Video; index: number }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      onClick={() => video.videoUrl && setIsPlaying(true)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900">
        {isPlaying && video.videoUrl ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={video.videoUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                <Play size={24} className="ml-1" style={{ color: '#1C1C1C' }} />
              </div>
            </div>

            {/* Duration badge */}
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-2 py-1 rounded">
              {video.duration}
            </div>

            {/* "Bientot" badge if no video */}
            {!video.videoUrl && (
              <div
                className="absolute top-2 left-2 text-xs font-semibold px-2.5 py-1 rounded"
                style={{ background: '#C9A84C', color: '#1C1C1C' }}
              >
                Bientôt
              </div>
            )}
          </>
        )}
      </div>

      {/* Title */}
      <h3 className="mt-3 text-sm font-semibold leading-snug line-clamp-2 group-hover:text-[#C9A84C] transition-colors" style={{ color: '#1C1C1C' }}>
        {video.title}
      </h3>
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
          <img src={heroImage} alt="Témoignages clients" className="w-full h-full object-cover" />
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Témoignages</h1>
            <p className="text-2xl max-w-2xl">
              Découvrez ce que nos clients disent de leur expérience avec The Bridge
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video Grid — YouTube style */}
      <section className="py-16" style={{ background: '#F5F3EE' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1C1C1C' }}>
              Témoignages vidéo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nos clients partagent leur expérience directement en vidéo
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video, i) => (
              <VideoCard key={video.id} video={video} index={i} />
            ))}
          </div>

          {/* Upload CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-14 bg-white rounded-2xl p-10 text-center"
            style={{ border: '2px dashed #C9A84C66' }}
          >
            <Play size={48} className="mx-auto mb-4" style={{ color: '#C9A84C' }} />
            <h3 className="text-2xl font-semibold mb-3" style={{ color: '#1C1C1C' }}>
              Vous êtes un client The Bridge ?
            </h3>
            <p className="text-gray-500 mb-6 max-w-lg mx-auto">
              Partagez votre expérience en vidéo et rejoignez notre communauté de clients satisfaits.
              Contactez-nous via WhatsApp pour soumettre votre témoignage.
            </p>
            <WhatsAppButton
              message="Bonjour, je souhaite partager mon témoignage vidéo en tant que client The Bridge."
              className="px-8 py-3"
            />
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
