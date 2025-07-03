import Loading from '@/components/loading/Loading';
import { useSiteSetting } from '@/context/siteSetting/useSiteSetting';

import { motion } from 'framer-motion';
import {
  BookOpen,
  Users,
  Video,
  Award,
  Globe,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaTelegram, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';

const features = [
  { icon: BookOpen, title: 'Free Study Materials' },
  { icon: Users, title: 'Expert Educators' },
  { icon: Video, title: 'Video Lectures' },
  { icon: Award, title: 'Competitive Exam Focus' },
  { icon: Globe, title: 'Access Anywhere' },
  { icon: Lightbulb, title: 'Doubt Solving' },
];

const defaultSocialLinks = [
  {
    name: 'Telegram',
    icon: <FaTelegram className="text-6xl text-blue-500" />,
    href: 'https://t.me/yourbaseacademy',
    bg: 'bg-[#229ED9]',
  },
  {
    name: 'WhatsApp',
    icon: <FaWhatsapp className="text-6xl text-green-500" />,
    href: 'https://wa.me/8587931817',
    bg: 'bg-[#25D366]',
  },
  {
    name: 'Instagram',
    icon: (
      <FaInstagram className="text-6xl rounded-3xl bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af]" />
    ),
    href: 'https://www.instagram.com/yourbaseacademy/',
    bg: 'bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af]',
  },
  {
    name: 'Facebook',
    icon: <FaFacebook className="text-6xl text-blue-500" />,
    href: 'https://facebook.com/yourpage',
    bg: 'bg-[#1877F2]',
  },
  {
    name: 'YouTube',
    icon: <FaYoutube className="text-6xl text-red-600" />,
    href: 'https://www.youtube.com/@yourbaseacademy',
    bg: 'bg-[#FF0000]',
  },
  {
    name: 'GitHub',
    icon: <FaGithub className="text-6xl text-black" />,
    href: 'https://github.com/yourbaseacademy',
    bg: 'bg-[#000000]',
  },
  {
    name: 'Twitter',
    icon:<FaTwitter className="text-6xl text-blue-500" />,
    href: 'https://x.com/yourbaseacademy',
    bg: 'bg-[#1DA1F2]',
  }
];
const About = () => {
  const { siteInfo } = useSiteSetting() || {};
  const [socialLinks, setSocialLinks] = useState(defaultSocialLinks);

 useEffect(() => {
  if (siteInfo?.socialLinks) {
    const links = siteInfo.socialLinks as Record<string, string>;

    const updatedLinks = defaultSocialLinks.map((item) => {
      const key = item.name.toLowerCase();
      return {
        ...item,
        href: links[key] || item.href,
      };
    });

    setSocialLinks(updatedLinks);
  }
}, [siteInfo]);


  if (!siteInfo) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <section className="mt-22 px-6 py-16 bg-muted/50 text-foreground">
      <div className="max-w-5xl mx-auto space-y-16 text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            About Base Academy
          </h2>
          <p className="mt-4 text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            Empowering students with quality and accessible education — for free.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          {[
            {
              title: '🎯 Our Mission',
              text: `To bridge the gap between affordability and quality by offering free resources and expert guidance to learners everywhere.`,
            },
            {
              title: '🌱 Our Vision',
              text: `To create an inclusive ecosystem where every student can thrive through access to structured learning and mentorship.`,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-background border rounded-2xl p-6 shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-background border rounded-2xl p-8 md:p-10 shadow-md text-left"
        >
          <h3 className="text-2xl font-semibold text-center mb-8">
            💡 Why Choose Base Academy?
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <feature.icon className="w-6 h-6 text-primary mt-1" />
                <span className="text-foreground font-medium">{feature.title}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-muted-foreground mb-4">
            Since 2012, We offer expert online coaching to build strong academic foundations.
            Build your base, build your career — your success starts here.
          </p>
          <p>Join us Now!</p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-2xl p-6 md:p-10 bg-muted/50 text-center shadow-xl"
          >
            <h3 className="text-3xl font-bold mb-8">📲 Join Our Community</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col items-center justify-center gap-3 p-4 rounded-2xl text-white transition-transform transform hover:scale-105 shadow-md ${link.bg}`}
                >
                  <div className="p-3 bg-white bg-opacity-20 rounded-full">
                    {link.icon}
                  </div>
                  <span className="text-lg font-semibold">{link.name}</span>
                </a>
              ))}
            </div>
          </motion.div>

          <a
            href="/courses"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-6 py-3 rounded-lg shadow hover:opacity-90 transition mt-6"
          >
            Explore Our Courses <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
