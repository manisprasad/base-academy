import { useSiteSetting } from '@/context/siteSetting/useSiteSetting';
import { PhoneCall } from 'lucide-react';
import { useEffect, useState } from 'react';
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

const defaultSocialLinks: SocialLink[] = [
  { name: 'whatsapp', url: 'https://wa.me/8587931817' },
  { name: 'facebook', url: 'https://facebook.com/yourbaseacademy' },
  { name: 'youtube', url: 'https://www.youtube.com/@yourbaseacademy' },
  { name: 'telegram', url: 'https://t.me/yourbaseacademy' },
  { name: 'instagram', url: 'https://www.instagram.com/yourbaseacademy/' },
];

const defaultContact = ['8587931817', '01169023365'];

const iconMap = {
  whatsapp: <FaWhatsapp className="text-green-500 text-xl md:text-2xl" />,
  facebook: <FaFacebook className="text-blue-600 text-xl md:text-2xl" />,
  youtube: <FaYoutube className="text-red-600 text-xl md:text-2xl" />,
  telegram: <FaTelegram className="text-sky-500 text-xl md:text-2xl" />,
  instagram: <FaInstagram className="text-pink-500 text-xl md:text-2xl" />,
};

export default function HeaderTop() {
  const { siteInfo } = useSiteSetting();
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(defaultSocialLinks);
  const [contact, setContact] = useState<string[]>(defaultContact);

  useEffect(() => {
    if (siteInfo?.socialLinks) {
      const updatedLinks = defaultSocialLinks.map((link) => ({
        ...link,
        url: siteInfo.socialLinks?.[link.name] || link.url,
      }));
      setSocialLinks(updatedLinks);
    }

    if(siteInfo?.contactInfo?.contactPhone){
      setContact(() => {
        return siteInfo?.contactInfo?.contactPhone || defaultContact;
      })
    }
  }, [siteInfo]);

  return (
    <div className="bg-orange-300 text-black px-4 py-2 text-sm border-b fixed top-0 left-0 right-0 z-50 w-full shadow-sm">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-3 md:gap-6">
        {/* Contact Info */}
        <div className="flex items-center gap-2">
          <PhoneCall className="text-black" size={18} />
          {contact.map((num, i) => (
            <a
              key={i}
              href={`tel:${num}`}
              className="text-[15px] underline hover:text-primary hover:font-medium transition-colors"
            >
              {num}
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-3 md:gap-4">
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
