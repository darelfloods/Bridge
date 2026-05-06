import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  Plane,
  ShoppingBag,
  FileText,
  MapPin,
  Compass,
  GraduationCap,
  ShieldCheck,
  X,
} from "lucide-react";

const featuredOffers = [
  {
    id: 1,
    image: "/offers/destination-nigeria.jpg",
    title: "Destination Nigeria",
    subtitle: "Commerces · Industries · Technologies · Agricultures",
    price: "À partir de 1.400.000 FCFA",
    amount: 1400000,
    whatsappMsg:
      "Bonjour, je suis intéressé par l'offre Destination Nigeria. Pouvez-vous m'en dire plus ?",
    span: false,
  },
  {
    id: 2,
    image: "/offers/centre-kano-teal.jpg",
    title: "Centre Kano — Tourisme d'Affaire",
    subtitle: "Industrie textile · Production · Sourcing · Kano & Lagos",
    price: "À partir de 1.400.000 FCFA",
    amount: 1400000,
    whatsappMsg:
      "Bonjour, je suis intéressé par l'offre Centre Kano Tourisme d'affaire textile. Pouvez-vous m'en dire plus ?",
    span: false,
  },
  {
    id: 3,
    image: "/offers/centre-kano-dark.jpg",
    title: "Centre Kano — Édition Spéciale",
    subtitle: "Marchés Kano & Lagos · Fournisseurs directs",
    price: "À partir de 1.400.000 FCFA",
    amount: 1400000,
    whatsappMsg:
      "Bonjour, je suis intéressé par l'offre Centre Kano édition spéciale. Pouvez-vous m'en dire plus ?",
    span: false,
  },
];

export function Services() {
  const navigate = useNavigate();
  const [selectedOffer, setSelectedOffer] = useState<
    (typeof featuredOffers)[number] | null
  >(null);
  const servicesImage = "/lagos-skyline-hd.jpg";

  const handleOfferClick = (offer: (typeof featuredOffers)[number]) => {
    setSelectedOffer(offer);
  };

  const handlePaymentConfirmation = () => {
    if (!selectedOffer) return;
    navigate("/checkout", {
      state: {
        offer: {
          id: selectedOffer.id,
          title: selectedOffer.title,
          price: selectedOffer.price,
          amount: selectedOffer.amount,
        },
      },
    });
    setSelectedOffer(null);
  };

  const services = [
    {
      icon: <Plane className="w-12 h-12" />,
      title: "Tourisme d'affaire au Nigeria",
      description:
        "Organisation complète de voyages professionnels vers le Nigeria, incluant l'hébergement, les rendez-vous d'affaires, les visites d'usines et centres commerciaux.",
      price: "Sur devis",
      details: [
        "Billets d'avion aller-retour",
        "Hébergement en hôtel 4-5 étoiles",
        "Organisation de rendez-vous d'affaires",
        "Visite des centres textiles de Kano et Lagos",
        "Transport et chauffeur",
        "Assistante et interprète",
      ],
    },
    {
      icon: <ShoppingBag className="w-12 h-12" />,
      title: "Personal Shopper",
      description:
        "Accompagnement dans vos achats et produits textiles au Nigeria, avec sélection des meilleurs fournisseurs et négociation des prix.",
      price: "Sur devis",
      details: [
        "Identification des meilleurs fournisseurs",
        "Négociation des tarifs",
        "Contrôle qualité des produits",
        "Gestion des commandes",
        "Organisation de la logistique",
        "Accompagnement douanier",
      ],
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: "Consulting et accompagnement",
      description:
        "Conseil stratégique pour votre développement en Afrique, de la conception à la mise en œuvre de vos projets.",
      price: "Sur devis",
      details: [
        "Analyse de votre projet",
        "Recommandations stratégiques",
        "Plan d'action détaillé",
        "Formation aux pratiques locales",
        "Accompagnement opérationnel",
        "Support continu",
      ],
    },
    {
      icon: <MapPin className="w-12 h-12" />,
      title: "Voyages sur-mesure",
      description:
        "Organisation de voyages professionnels personnalisés vers d'autres destinations africaines selon vos besoins spécifiques.",
      price: "Sur devis",
      details: [
        "Destinations multiples disponibles",
        "Itinéraire personnalisé",
        "Réservations complètes",
        "Guide local expert",
        "Flexibilité totale",
        "Assistance 24/7",
      ],
    },
    {
      icon: <Compass className="w-12 h-12" />,
      title: "Aventure culturelle au Gabon",
      description:
        "Tourisme culturel afro-descendant pour les Américains souhaitant visiter et découvrir le Gabon — un séjour immersif pour renouer avec ses racines africaines.",
      price: "Sur devis",
      details: [
        "Retraite spirituelle",
        "B2B ou échange avec le marché et entrepreneurs gabonais",
        "Placement dans des familles gabonaises pour immersion linguistique",
        "Danses traditionnelles et visites touristiques — Lékoni, Mouanda, Franceville, visite des tortues",
        "Visite de la chambre de commerce, incitations à faire des affaires en Afrique",
        "Logement, alimentation et guide",
      ],
    },
    {
      icon: <GraduationCap className="w-12 h-12" />,
      title: "Formation industrielle",
      description:
        "Programmes de formation dans les secteurs clés de l'économie africaine pour développer vos compétences et créer des opportunités.",
      price: "Sur devis",
      details: [
        "Agriculture et agroalimentaire",
        "Élevage",
        "Coiffure et cosmétiques",
        "Accompagnement pratique sur le terrain",
        "Certification et suivi post-formation",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[340px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={servicesImage}
            alt="Our Services"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(28,28,28,0.80), rgba(28,28,28,0.50), transparent)",
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Nos services & offres
            </h1>
            <p className="text-2xl max-w-3xl">
              Des solutions complètes pour réussir vos projets professionnels en
              Afrique
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-16" style={{ background: "#F5F3EE" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
              style={{ background: "#C9A84C22", color: "#C9A84C" }}
            >
              Nos forfaits
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold mb-3"
              style={{ color: "#1C1C1C" }}
            >
              Nos offres
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Découvrez nos destinations et forfaits disponibles dès maintenant
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-black cursor-pointer"
                style={{ minHeight: "440px" }}
                onClick={() => handleOfferClick(offer)}
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 45%, transparent 100%)",
                  }}
                />

                {/* Badge numéro */}
                <div
                  className="absolute top-5 left-5 w-11 h-11 rounded-full flex items-center justify-center text-sm font-black shadow-lg z-10"
                  style={{ background: "#C9A84C", color: "#1C1C1C" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-7 text-white z-10">
                  {/* Titre */}
                  <h3 className="text-xl font-bold leading-snug mb-1 drop-shadow-lg">
                    {offer.title}
                  </h3>
                  {/* Sous-titre */}
                  <p
                    className="text-sm mb-4"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {offer.subtitle}
                  </p>

                  {/* Prix */}
                  <div
                    className="inline-flex items-center gap-1.5 text-xs font-black px-4 py-1.5 rounded-full mb-5"
                    style={{ background: "#C9A84C", color: "#1C1C1C" }}
                  >
                    {offer.price}
                  </div>

                  {/* Bouton WhatsApp — slide up au hover */}
                  <div
                    className="transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <WhatsAppButton
                      message={offer.whatsappMsg}
                      className="w-full justify-center !py-3 !text-sm font-semibold"
                    />
                  </div>
                </div>

                {/* Golden border glow on hover */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: "inset 0 0 0 2px #C9A84C" }}
                />
              </motion.div>
            ))}
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
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "#1C1C1C" }}
            >
              Tous nos services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un accompagnement complet à chaque étape de votre développement en
              Afrique
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
                className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 p-10"
              >
                <div className="mb-5" style={{ color: "#C9A84C" }}>
                  {service.icon}
                </div>
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ color: "#1C1C1C" }}
                >
                  {service.title}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="mb-6">
                  <a
                    href={`https://wa.me/24160354192?text=${encodeURIComponent(`Bonjour, je souhaite obtenir un devis pour le service "${service.title}".\n\nDétails inclus :\n${service.details.map((d) => `• ${d}`).join("\n")}\n\nLien de la page : ${window.location.origin}/services`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-white px-5 py-2 rounded-full font-semibold hover:opacity-80 transition-opacity cursor-pointer"
                    style={{ background: "#C9A84C" }}
                  >
                    {service.price}
                  </a>
                </div>
                <div className="mb-8">
                  <h4
                    className="font-semibold mb-3 text-lg"
                    style={{ color: "#1C1C1C" }}
                  >
                    Inclus
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: "#C9A84C" }}>
                          &#10003;
                        </span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <WhatsAppButton
                  message={`Bonjour, je suis intéressé par le service "${service.title}".\n\nDétails inclus :\n${service.details.map((d) => `• ${d}`).join("\n")}\n\nLien de la page : ${window.location.origin}/services`}
                  className="mt-auto w-full justify-center"
                >
                  Commander sur WhatsApp
                </WhatsAppButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Service CTA */}
      <section className="py-20" style={{ background: "#F5F3EE" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold mb-8"
            style={{ color: "#1C1C1C" }}
          >
            Vous avez un projet spécifique ?
          </h2>
          <p className="text-xl text-gray-700 mb-10 leading-relaxed">
            Nous créons des solutions sur-mesure adaptées à vos besoins.
            Contactez-nous pour discuter de votre projet et obtenir un devis
            personnalisé.
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

      <AnimatePresence>
        {selectedOffer && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/65 backdrop-blur-sm"
              onClick={() => setSelectedOffer(null)}
            />

            <motion.div
              className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl bg-white"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="px-8 py-6 text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #1C1C1C 0%, #2D2D2D 100%)",
                }}
              >
                <button
                  onClick={() => setSelectedOffer(null)}
                  className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors"
                  aria-label="Fermer"
                >
                  <X size={18} />
                </button>
                <p
                  className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
                  style={{ color: "#C9A84C" }}
                >
                  Confirmation de paiement
                </p>
                <h3 className="text-2xl font-bold leading-tight">
                  {selectedOffer.title}
                </h3>
                <p className="text-white/70 mt-2 text-sm">
                  Vous serez redirigé vers notre page de paiement sécurisé.
                </p>
              </div>

              <div className="px-8 py-7">
                <div
                  className="flex items-center justify-between rounded-2xl px-5 py-4 mb-6"
                  style={{ background: "#F5F3EE" }}
                >
                  <span className="font-medium text-gray-600">
                    Montant de l'offre
                  </span>
                  <span
                    className="font-extrabold text-lg"
                    style={{ color: "#1C1C1C" }}
                  >
                    {selectedOffer.price}
                  </span>
                </div>

                <p className="text-gray-600 mb-7 leading-relaxed">
                  Souhaitez-vous continuer et effectuer le paiement maintenant ?
                </p>

                <div
                  className="flex items-start gap-2 text-xs text-gray-500 mb-7 rounded-xl px-4 py-3"
                  style={{ background: "#F8F8F8" }}
                >
                  <ShieldCheck size={15} className="mt-0.5 flex-shrink-0" />
                  <span>
                    Transaction sécurisée. Vous pourrez confirmer l'opérateur et
                    le numéro avant validation finale.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedOffer(null)}
                    className="w-full py-3.5 rounded-xl font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Non, pas maintenant
                  </button>
                  <button
                    onClick={handlePaymentConfirmation}
                    className="w-full py-3.5 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: "#1C1C1C" }}
                  >
                    Oui, continuer
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
