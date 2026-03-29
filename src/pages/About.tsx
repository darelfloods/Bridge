import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { Target, Eye, Heart, Award } from 'lucide-react';
import { motion } from 'motion/react';

export function About() {
  const aboutImage =
    '/new-york-skyline.jpg';

  const values = [
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Fiabilité',
      description: 'Nous nous engageons à tenir nos promesses et à livrer des résultats concrets et mesurables.',
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'Professionnalisme',
      description: "Notre équipe expérimentée garantit un service de qualité supérieure à chaque étape.",
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: 'Proximité avec les clients',
      description: "Nous cultivons des relations durables basées sur l'écoute et la compréhension de vos besoins.",
    },
    {
      icon: <Eye className="w-12 h-12" />,
      title: 'Innovation',
      description: 'Nous adoptons les meilleures pratiques et solutions pour optimiser votre développement.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[340px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={aboutImage} alt="About The Bridge" className="w-full h-full object-cover" />
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">À propos de The Bridge</h1>
            <p className="text-2xl max-w-2xl">
              Découvrez notre histoire, notre mission et les valeurs qui nous animent
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center" style={{ color: '#1C1C1C' }}>Notre histoire</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                The Bridge est née de la vision de créer un pont entre les opportunités commerciales en Afrique
                et les entrepreneurs ambitieux. Fort de notre expertise du marché africain, notamment au Nigeria,
                nous avons développé une approche unique qui combine tourisme d'affaire et développement commercial.
              </p>
              <p>
                Basé au Gabon, à Las Vegas et présent en Afrique, nous avons accompagné de nombreuses entreprises dans leur
                expansion sur le continent africain. Notre connaissance approfondie des marchés locaux, des cultures
                et des pratiques commerciales nous permet de faciliter vos projets avec efficacité.
              </p>
              <p>
                Aujourd'hui, The Bridge est reconnu comme un partenaire de confiance pour tous ceux qui souhaitent
                explorer les opportunités en Afrique, que ce soit dans le textile, l'industrie, les technologies,
                l'agriculture, l'agroalimentaire, l'élevage ou les énergies solaires.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20" style={{ background: '#F5F3EE' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-lg shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <Target className="w-12 h-12" style={{ color: '#C9A84C' }} />
                <h2 className="text-3xl font-bold" style={{ color: '#1C1C1C' }}>Notre mission</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Faciliter l'accès aux opportunités culturelles et d'affaires en Afrique, aux États-Unis et à Dubaï
                en offrant un accompagnement personnalisé, des connexions stratégiques et une expertise locale.
                Nous aidons nos clients à naviguer avec confiance dans les marchés africains et à concrétiser
                leurs projets professionnels.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-lg shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <Eye className="w-12 h-12" style={{ color: '#C9A84C' }} />
                <h2 className="text-3xl font-bold" style={{ color: '#1C1C1C' }}>Notre vision</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Devenir le leader du tourisme d'affaire et du développement commercial en Afrique, reconnu pour
                notre capacité à créer des ponts durables entre les continents. Nous ambitionnons d'être le
                partenaire privilégié de toute entreprise souhaitant réussir sur le marché africain. Sans oublier
                que notre vision est d'être un pont culturel entre les afro-descendants Américains et les
                afro-descendants Africains.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#1C1C1C' }}>Nos valeurs</h2>
            <p className="text-xl text-gray-600">Les principes qui guident notre action au quotidien</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 text-center"
              >
                <div className="mb-6 flex justify-center" style={{ color: '#C9A84C' }}>{value.icon}</div>
                <h3 className="text-2xl font-semibold mb-4" style={{ color: '#1C1C1C' }}>{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-white" style={{ background: '#1C1C1C' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Travaillons ensemble</h2>
          <p className="text-xl mb-10 text-gray-400 leading-relaxed">
            Rejoignez nos nombreux clients satisfaits et découvrez comment The Bridge peut transformer vos ambitions en réalité
          </p>
          <WhatsAppButton className="text-lg px-10 py-4 shadow-xl" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
