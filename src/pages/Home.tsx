import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ArrowRight,
  Briefcase,
  Globe,
  TrendingUp,
  Users,
  Compass,
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';

const slides = [
  {
    id: 1,
    image: '/new-york-skyline.jpg',
    headline: 'Vos projets,\nnotre pont vers\nle succès',
    subtitle: "Voyages d'affaires organisés vers le Nigeria, les États-Unis, Dubaï et le Ghana avec un accompagnement complet et personnalisé.",
  },
  {
    id: 2,
    image: '/waterfront-city.jpg',
    headline: 'Des rencontres\nqui font\nla différence',
    subtitle: 'Nous vous connectons aux bons partenaires et aux meilleures opportunités commerciales en Afrique.',
  },
  {
    id: 3,
    image: '/lagos-sunset.jpg',
    headline: "L'excellence\ngabonaise\nau service du monde",
    subtitle: "Des professionnels engagés pour faire rayonner le Gabon sur la scène internationale des affaires.",
  },
  {
    id: 4,
    image: '/libreville-landmark.jpg',
    headline: 'Des partenariats\nsolides pour\nvotre avenir',
    subtitle: 'Facilitez vos échanges commerciaux et développez des relations durables avec nos experts terrain.',
  },
  {
    id: 5,
    image: '/city-building.jpg',
    headline: "Au cœur de\nl'Afrique\ndes affaires",
    subtitle: 'Libreville, Lagos, Abuja — The Bridge ouvre les portes des marchés les plus dynamiques du continent.',
  },
];

const services = [
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "Tourisme d'affaire",
    description: 'Voyages professionnels organisés vers le Nigeria et autres destinations africaines.',
  },
  {
    icon: <Compass className="w-8 h-8" />,
    title: 'Tourisme culturel',
    description: "Découverte des richesses culturelles du Gabon et d'Afrique pour les afro-descendants souhaitant renouer avec leurs racines.",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Commerce international',
    description: "Facilitation des échanges commerciaux et développement de partenariats solides.",
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'Consulting',
    description: "Accompagnement stratégique pour votre développement sur les marchés africains.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Mise en relation',
    description: "Connexion avec les bons partenaires et les meilleures opportunités d'affaires.",
  },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const prev = useCallback(() => {
    const index = (current - 1 + slides.length) % slides.length;
    goTo(index, -1);
  }, [current, goTo]);

  const next = useCallback(() => {
    const index = (current + 1) % slides.length;
    goTo(index, 1);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  const whatsappLink =
    'https://wa.me/24160354192?text=' +
    encodeURIComponent('Bonjour, je souhaite en savoir plus sur vos services.');

  return (
    <section className="relative w-full overflow-hidden" style={{ height: 'min(600px, 85vh)' }}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slides[current].id}
          custom={direction}
          variants={{
            enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={`Slide ${slides[current].id}`}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(105deg, rgba(28,28,28,0.92) 0%, rgba(28,28,28,0.78) 45%, rgba(28,28,28,0.35) 70%, rgba(201,168,76,0.18) 100%)',
            }}
          />

          <div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ background: 'linear-gradient(90deg, #B08D35, #C9A84C, #D4B85C, #C9A84C, #B08D35)' }}
          />

          <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="text-white">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="origin-left mb-5"
                  style={{ width: 64, height: 4, background: '#C9A84C', borderRadius: 2 }}
                />

                <motion.h1
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 whitespace-pre-line"
                >
                  {slides[current].headline}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="text-lg sm:text-xl text-white/85 mb-10 max-w-lg leading-relaxed"
                >
                  {slides[current].subtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-wrap gap-4"
                >
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-all hover:brightness-110 hover:scale-105"
                    style={{ background: '#25D366' }}
                  >
                    <MessageCircle size={20} />
                    Nous contacter sur WhatsApp
                  </a>

                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold border-2 transition-all hover:scale-105"
                    style={{
                      borderColor: '#C9A84C',
                      color: '#C9A84C',
                      background: 'rgba(201,168,76,0.08)',
                    }}
                  >
                    Découvrir nos services
                    <ArrowRight size={18} />
                  </Link>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="hidden lg:flex justify-center items-center"
              >
                <div
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    width: 380,
                    height: 420,
                    border: '3px solid rgba(201,168,76,0.5)',
                    boxShadow: '0 0 60px rgba(201,168,76,0.15), 0 20px 60px rgba(0,0,0,0.4)',
                  }}
                >
                  <img
                    src={slides[current].image}
                    alt="Slide visual"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(0.9)' }}
                  />
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{ border: '1px solid rgba(201,168,76,0.3)', pointerEvents: 'none' }}
                  />
                  <div
                    className="absolute bottom-5 left-5 right-5 rounded-xl px-4 py-3 flex items-center gap-3"
                    style={{ background: 'rgba(28,28,28,0.85)', backdropFilter: 'blur(10px)' }}
                  >
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#C9A84C' }} />
                    <span className="text-white text-sm font-medium">
                      {"The Bridge \u2014 Nigeria · États-Unis · Dubaï · Ghana"}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prev}
        aria-label="Slide précédente"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
        style={{
          background: 'rgba(28,28,28,0.6)',
          border: '1px solid rgba(201,168,76,0.4)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <ChevronLeft size={22} color="#C9A84C" />
      </button>

      <button
        onClick={next}
        aria-label="Slide suivante"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
        style={{
          background: 'rgba(28,28,28,0.6)',
          border: '1px solid rgba(201,168,76,0.4)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <ChevronRight size={22} color="#C9A84C" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            aria-label={`Aller au slide ${i + 1}`}
            className="rounded-full transition-all duration-300 cursor-pointer"
            style={{
              width: i === current ? 28 : 8,
              height: 8,
              background: i === current ? '#C9A84C' : 'rgba(255,255,255,0.45)',
            }}
          />
        ))}
      </div>

      <div
        className="absolute top-6 right-6 z-20 text-sm font-medium"
        style={{ color: 'rgba(201,168,76,0.85)' }}
      >
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </section>
  );
}

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSlider />

      {/* Introduction */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ color: '#1C1C1C' }}>Qui sommes-nous ?</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-10">
              The Bridge est une entreprise spécialisée dans le tourisme d'affaire et le développement commercial
              en Afrique. Nous facilitons vos projets professionnels en vous connectant aux bonnes opportunités
              et aux bons partenaires au Nigeria et au-delà.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 transition-colors text-lg font-semibold border-b-2 pb-1"
              style={{ color: '#C9A84C', borderColor: '#C9A84C' }}
            >
              En savoir plus sur notre entreprise
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-20" style={{ background: '#F5F3EE' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#1C1C1C' }}>Nos services</h2>
            <p className="text-xl text-gray-600">Des solutions adaptées à vos besoins professionnels</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="mb-6" style={{ color: '#C9A84C' }}>{service.icon}</div>
                <h3 className="text-2xl font-semibold mb-4" style={{ color: '#1C1C1C' }}>{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-white px-10 py-4 rounded-lg transition-all text-lg font-semibold shadow-lg hover:brightness-110"
              style={{ background: '#C9A84C' }}
            >
              Découvrir tous nos services
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 text-white" style={{ background: '#1C1C1C' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Prêt à démarrer votre projet ?</h2>
          <p className="text-xl mb-10 text-gray-400 leading-relaxed">
            Contactez-nous dès maintenant pour discuter de vos besoins et découvrir comment nous pouvons vous aider
          </p>
          <WhatsAppButton className="text-lg px-10 py-4 shadow-xl" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
