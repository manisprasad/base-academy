
import {
  PhoneCall,
} from 'lucide-react';
import {
  FaWhatsapp,
  FaTelegram,
  FaFacebook,
  FaYoutube,
  FaInstagram,
} from 'react-icons/fa';

type SocialLink = {
  name: 'whatsapp' | 'facebook' | 'youtube' | 'telegram' | 'instagram';
  url: string;
};

const socialLinks: SocialLink[] = [
  { name: 'whatsapp', url: 'https://wa.me/9319493165' },
  { name: 'facebook', url: 'https://facebook.com/Concept-Online-Classes' },
  { name: 'youtube', url: 'https://youtube.com/c/santoshkumaronlinestudy' },
  { name: 'telegram', url: 'https://t.me/SantoshKumarCOC' },
  { name: 'instagram', url: 'https://instagram.com/coc_education_' },
];

const purchaseContacts = ['7303445575', '8448322142'];

const iconMap = {
  whatsapp: <FaWhatsapp className="text-green-500 text-xl md:text-2xl" />,
  facebook: <FaFacebook className="text-blue-600 text-xl md:text-2xl" />,
  youtube: <FaYoutube className="text-red-600 text-xl md:text-2xl" />,
  telegram: <FaTelegram className="text-sky-500 text-xl md:text-2xl" />,
  instagram: <FaInstagram className="text-pink-500 text-xl md:text-2xl" />,
};

export default function HeaderTop() {
  return (
    <div className="bg-orange-300 text-black px-4 py-2 text-sm border-b fixed top-0 left-0 right-0 z-50 w-full shadow-sm">
      <div className="max-w-screen-xl mx-auto flex  items-center justify-between gap-3 md:gap-6">
        {/* Contact Info */}
        <div className="flex items-center  gap-2">
          <PhoneCall className="text-black" size={18} />
          {purchaseContacts.map((num, i) => (
            <a
              key={i}
              href={`tel:${num}`}
              className="text-[15px]  underline hover:text-primary hover:font-medium transition-colors"
            >
              {num}
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex  items-center justify-center gap-3 md:gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="hover:scale-110 transition-transform"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {iconMap[link.name]}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
