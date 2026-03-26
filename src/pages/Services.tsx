import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { motion } from 'motion/react';
import { Plane, ShoppingBag, FileText, MapPin } from 'lucide-react';

const featuredOffers = [
  {
    id: 1,
    image: '/offers/destination-nigeria.jpg',
    title: 'Destination Nigeria',
    subtitle: 'Commerces · Industries · Technologies · Agricultures',
    price: 'À partir de 1.400.000 FCFA',
    whatsappMsg: 'Bonjour, je suis intéressé par l\'offre Destination Nigeria. Pouvez-vous m\'en dire plus ?',
    span: false,
  },
  {
    id: 2,
    image: '/offers/voyage-7-jours.jpg',
    title: 'Voyage Nigeria — 7 Jours',
    subtitle: 'Séjour Découverte · Départ 5 Avril',
    price: 'Forfait complet inclus',
    whatsappMsg: 'Bonjour, je suis intéressé par le Voyage Nigeria Séjour Découverte 7 jours. Pouvez-vous m\'en dire plus ?',
    span: false,
  },
  {
    id: 3,
    image: '/offers/centre-kano-teal.jpg',
    title: 'Centre Kano — Tourisme Textile',
    subtitle: 'Industrie textile · Production · Sourcing',
    price: 'À partir de 1.400.000 FCFA',
    whatsappMsg: 'Bonjour, je suis intéressé par l\'offre Centre Kano Tourisme d\'affaire textile. Pouvez-vous m\'en dire plus ?',
    span: false,
  },
  {
    id: 4,
    image: '/offers/centre-kano-dark.jpg',
    title: 'Centre Kano — Édition Spéciale',
    subtitle: 'Marchés Kano & Lagos · Fournisseurs directs',
    price: 'À partir de 1.400.000 FCFA',
    whatsappMsg: 'Bonjour, je suis intéressé par l\'offre Centre Kano édition spéciale. Pouvez-vous m\'en dire plus ?',
    span: false,
  },
];

export function Services() {
  const servicesImage =
    '/african-professionals.jpg';

  const services = [
    {
      icon: <Plane className="w-12 h-12" />,
      title: "Tourisme d'affaire au Nigeria",
      description:
        "Organisation complète de voyages professionnels vers le Nigeria, incluant l'hébergement, les rendez-vous d'affaires, les visites d'usines et centres commerciaux.",
      price: 'À partir de 1.400.000 FCFA',
      details: [
        "Billets d'avion aller-retour",
        'Hébergement en hôtel 4-5 étoiles',
        "Organisation de rendez-vous d'affaires",
        'Visite des centres textiles de Kano et Lagos',
        'Transport sur place',
        'Assistance et traduction',
      ],
    },
    {
      icon: <ShoppingBag className="w-12 h-12" />,
      title: 'Personal Shopper',
      description:
        'Accompagnement dans vos achats et produits textiles au Nigeria, avec sélection des meilleurs fournisseurs et négociation des prix.',
      price: 'Sur devis',
      details: [
        'Identification des meilleurs fournisseurs',
        'Négociation des tarifs',
        'Contrôle qualité des produits',
        'Gestion des commandes',
        'Organisation de la logistique',
        'Accompagnement douanier',
      ],
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: 'Consulting et accompagnement',
      description:
        "Conseil stratégique pour votre développement en Afrique, de la conception à la mise en œuvre de vos projets.",
      price: 'Sur devis',
      details: [
        'Analyse de votre projet',
        'Recommandations stratégiques',
        "Plan d'action détaillé",
        'Formation aux pratiques locales',
        'Accompagnement opérationnel',
        'Support continu',
      ],
    },
    {
      icon: <MapPin className="w-12 h-12" />,
      title: 'Voyages sur-mesure',
      description:
        "Organisation de voyages professionnels personnalisés vers d'autres destinations africaines selon vos besoins spécifiques.",
      price: 'Sur devis',
      details: [
        'Destinations multiples disponibles',
        'Itinéraire personnalisé',
        'Réservations complètes',
        'Guide local expert',
        'Flexibilité totale',
        'Assistance 24/7',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={servicesImage} alt="Our Services" className="w-full h-full object-cover" />
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Nos services & offres</h1>
            <p className="text-2xl max-w-3xl">
              Des solutions complètes pour réussir vos projets professionnels en Afrique
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-12" style={{ background: '#F5F3EE' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: '#1C1C1C' }}>Nos offres</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos forfaits et destinations disponibles dès maintenant
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredOffers.map((offer, index) => {
              const isLastOdd = index === featuredOffers.length - 1 && featuredOffers.length % 2 !== 0;
              return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 bg-black${isLastOdd ? ' md:col-span-2 md:w-1/2 md:mx-auto' : ''}`}
              >
                <div className="aspect-[5/4] overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1 drop-shadow">{offer.title}</h3>
                  <p className="text-sm text-gray-300 mb-3">{offer.subtitle}</p>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <span
                      className="text-sm font-bold px-4 py-1.5 rounded-full"
                      style={{ background: '#C9A84C', color: '#1C1C1C' }}
                    >
                      {offer.price}
                    </span>
                    <WhatsAppButton
                      message={offer.whatsappMsg}
                      className="!py-2 !px-5 text-sm"
                    />
                  </div>
                </div>
              </motion.div>
            );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1C1C1C' }}>Tous nos services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un accompagnement complet à chaque étape de votre développement en Afrique
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 p-10"
              >
                <div className="mb-6" style={{ color: '#C9A84C' }}>{service.icon}</div>
                <h3 className="text-3xl font-bold mb-4" style={{ color: '#1C1C1C' }}>{service.title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>
                <div className="mb-6">
                  <span
                    className="inline-block text-white px-5 py-2 rounded-full font-semibold"
                    style={{ background: '#C9A84C' }}
                  >
                    {service.price}
                  </span>
                </div>
                <div className="mb-8">
                  <h4 className="font-semibold mb-3 text-lg" style={{ color: '#1C1C1C' }}>Inclus</h4>
                  <ul className="space-y-2 text-gray-700">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#C9A84C' }}>&#10003;</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <WhatsAppButton
                  message={`Bonjour, je suis intéressé par le service "${service.title}". Pouvez-vous m'en dire plus ?`}
                  className="w-full justify-center"
                >
                  Commander sur WhatsApp
                </WhatsAppButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Service CTA */}
      <section className="py-20" style={{ background: '#F5F3EE' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ color: '#1C1C1C' }}>
            Vous avez un projet spécifique ?
          </h2>
          <p className="text-xl text-gray-700 mb-10 leading-relaxed">
            Nous créons des solutions sur-mesure adaptées à vos besoins. Contactez-nous pour discuter de votre
            projet et obtenir un devis personnalisé.
          </p>
          <WhatsAppButton
            message="Bonjour, j'ai un projet spécifique et je souhaiterais obtenir un devis personnalisé."
            className="text-lg px-10 py-4 shadow-xl"
          >
            Demander un devis personnalisé
          </WhatsAppButton>
        </div>
      </section>

      <Footer />
    </div>
  );
}
