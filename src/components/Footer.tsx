import { MessageCircle, Mail, Phone } from 'lucide-react';

export function Footer() {
  const whatsappNumber = '24160354192';
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <footer style={{ background: '#1C1C1C' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About */}
          <div>
            <div className="mb-6">
              <img src="/logo.png" alt="The Bridge Las Vegas LLC" className="h-16 w-auto" />
            </div>
            <p className="text-gray-400 leading-relaxed">
              Votre partenaire de confiance pour le tourisme d'affaire et le développement commercial en Afrique.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#C9A84C' }}>Liens rapides</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="/" className="hover:text-[#C9A84C] transition-colors">Accueil</a></li>
              <li><a href="/about" className="hover:text-[#C9A84C] transition-colors">À propos</a></li>
              <li><a href="/services" className="hover:text-[#C9A84C] transition-colors">Nos services</a></li>
              <li><a href="/testimonials" className="hover:text-[#C9A84C] transition-colors">Témoignages</a></li>
              <li><a href="/payment" className="hover:text-[#C9A84C] transition-colors">Paiement</a></li>
              <li><a href="/contact" className="hover:text-[#C9A84C] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#C9A84C' }}>Contact</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-[#C9A84C]" />
                <span>+241 60354192</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-[#C9A84C]" />
                <span>thebridgellc95@gmail.com</span>
              </li>
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-[#25D366] transition-colors"
                >
                  <MessageCircle size={20} className="text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 text-center text-gray-400" style={{ borderTop: '1px solid #C9A84C33' }}>
          <p>&copy; {new Date().getFullYear()} The Bridge. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
