import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "../../base_academy_logo.png";
import { MapPin, Phone, Mail } from "lucide-react";

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useSiteSetting } from "@/context/siteSetting/useSiteSetting";

// Define allowed social platforms
type SocialPlatform = "facebook" | "twitter" | "instagram" | "linkedin";

// Map display label to actual keys in siteInfo.socialLinks
const labelToPlatformMap: Record<string, SocialPlatform> = {
  Facebook: "facebook",
  Twitter: "twitter",
  Instagram: "instagram",
  LinkedIn: "linkedin",
};

// Default social links (with default "#")
const defaultSocialLinks = [
  { icon: <FaFacebook size={20} className="text-blue-500 scale-125" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter size={20} className="text-blue-400 scale-125" />, href: "#", label: "Twitter" },
  { icon: <FaInstagram size={20} className="text-red-500 scale-125" />, href: "#", label: "Instagram" },
  { icon: <FaLinkedin size={20} className="text-blue-400 scale-125" />, href: "#", label: "LinkedIn" },
];

const footerSections = [
  {
    title: "Courses",
    links: [
      { label: "Web Development", href: "#" },
      { label: "Data Science", href: "#" },
      { label: "UX/UI Design", href: "#" },
      { label: "Digital Marketing", href: "#" },
      { label: "Mobile Development", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#" },
      { label: "Tutorials", href: "#" },
      { label: "Webinars", href: "#" },
      { label: "Free Courses", href: "#" },
      { label: "Career Advice", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Partners", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

const Footer: React.FC = () => {
  const { siteInfo } = useSiteSetting();
  const [socialLinks, setSocialLinks] = useState(defaultSocialLinks);

useEffect(() => {
  if (siteInfo?.socialLinks) {
    const updatedLinks = defaultSocialLinks.map((link) => {
      const platformKey = labelToPlatformMap[link.label];

      // Safely access social link only if the key exists
      const customHref = platformKey && siteInfo.socialLinks
        ? siteInfo.socialLinks[platformKey]
        : undefined;

      return {
        ...link,
        href: customHref || link.href,
      };
    });

    setSocialLinks(updatedLinks);
  }
}, [siteInfo]);


  return (
    <footer className="bg-background text-muted-foreground pt-16 pb-8 border-t border-border">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand and Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img src={Logo} className="w-8 h-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-foreground font-display">
                Base Academy
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Empowering the next generation of digital creators, innovators,
              and leaders through cutting-edge education and expert mentorship.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-primary mt-1 mr-3" />
                <span className="text-muted-foreground">
                  {siteInfo?.contactInfo?.contactEmail || "yourbaseacademy@gmail.com"}
                </span>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-primary mt-1 mr-3" />
                <span className="text-muted-foreground">
                 {siteInfo?.contactInfo?.contactPhone?.join(' ') || "8587931817"}
                </span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mt-1 mr-3" />
                <span className="text-muted-foreground">
                  {siteInfo?.contactInfo?.address || "Base Academy , Anand Parbat, Near New Spot, New Delhi, 110005"}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-base font-semibold mb-6 text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-border my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Base Academy. All rights reserved.
          </p>

          <div className="flex gap-3 items-center justify-center">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="w-12 scale-125 ml-6 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground transition-colors"
                aria-label={link.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
