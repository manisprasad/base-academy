
import Hero from '../components/Hero';

import VideoSection from '../components/VideoSection';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';


import ModernCarousel from '@/components/Crasoual';
import { useEffect, useState } from 'react';

import ContactModal from '@/components/ContactModal';
import { useSiteSetting } from '@/context/siteSetting/useSiteSetting';




function Home() {
  const {siteInfo} = useSiteSetting();

  const [timeSpent, setTimeSpent] = useState<number>(0);
  console.log("Time spent on page:", timeSpent);

useEffect(() => {
  setTimeSpent(0);
  const timer = setInterval(() => {
    setTimeSpent((prev) => {
      if (prev + 1 === 10) {
        clearInterval(timer); // kill(timer) is not standard, use clearInterval
      }
      return prev + 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, []);





  return (

    <div className="overflow-x-hidden p-3 mt-15 ">
     


      <ModernCarousel />
      <Hero />
      <VideoSection />

      {
        timeSpent >= 10 && (
          
          <ContactModal />
        )
      }

      {/* Floating WhatsApp and Call Buttons */}
      <div className="fixed bottom-10 right-10 flex flex-col gap-3 z-50">
        {/* WhatsApp Button */}
        <a
          href={siteInfo?.socialLinks?.whatsapp || "https://wa.me/8587931817"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 text-8xl bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition"
        >
         <FaWhatsapp />
        </a>

        {/* Call Button */}
        <a
          href={`tel:${siteInfo?.contactInfo?.contactPhone?.length && siteInfo.contactInfo.contactPhone[0]  || "8587931817"}`}
          className="flex items-center justify-center w-12 h-12 text-3xl bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition"
        >
         <FaPhone />
        </a>
      </div>

      {/* <ContactModal /> */}
      {/* <Footer /> */}
    </div>

  );
}

export default Home;
