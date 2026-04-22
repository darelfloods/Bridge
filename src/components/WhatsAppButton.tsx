import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  children?: React.ReactNode;
}

export function WhatsAppButton({
  message = 'Bonjour, je souhaite en savoir plus sur vos services.',
  className = '',
  children,
}: WhatsAppButtonProps) {
  const whatsappNumber = '24160354192';
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg hover:bg-[#20BA5A] transition-colors font-semibold ${className}`}
    >
      <MessageCircle size={20} />
      {children || 'Discuter sur WhatsApp'}
    </a>
  );
}
