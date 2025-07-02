import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { User, Phone, MessageCircle } from 'lucide-react';
import CustomerSupportPng from '../assets/customer-support.png';

// Zod Schema
const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  number: z.string().min(10, 'Mobile number must be at least 10 digits'),
  message: z.string().min(1, 'Message is required'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
    },
  }),
};

const ContactUs = () => {

    useEffect(() => {
        window.scrollTo({top: 100})
    }, [])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    const whatsappURL = `https://wa.me/9319493165?text=${encodeURIComponent(
      `Hi, I’m name is ${data.name}. \n My Phone Number is  ${data.number}.  \n and my query is:   ${data.message}. `
    )}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/50 py-10 px-4 gap-10 mt-22">
      <motion.div
        className="w-full lg:w-11/12 rounded-2xl bg-background shadow-xl border p-6 md:p-10 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-foreground mb-4"
          variants={fadeInUp}
          custom={1}
        >
          Contact Us for Any Queries
        </motion.h2>

        <motion.div
          className="flex items-center justify-between mb-6 text-primary"
          variants={fadeInUp}
          custom={2}
        >
          {/* Opening quote icon */}
          <svg width={50} viewBox="0 0 20 20" fill="#000000" xmlns="http://www.w3.org/2000/svg">
            <path d="..." />
          </svg>
        </motion.div>

        <motion.p
          className="text-muted-foreground md:text-lg mb-6 text-lg lg:text-2xl"
          variants={fadeInUp}
          custom={3}
        >
          Well, we have years of experience in helping students to access Free Study Materials...
        </motion.p>

        <motion.div
          className="flex items-end justify-end-safe mb-6 text-primary"
          variants={fadeInUp}
          custom={4}
        >
          {/* Closing quote icon */}
          <svg width={50} viewBox="0 0 20 20" fill="#000000" transform="matrix(-1, 0, 0, -1, 0, 0)">
            <path d="..." />
          </svg>
        </motion.div>

        <motion.p
          className="mb-8 text-sm md:text-base"
          variants={fadeInUp}
          custom={5}
        >
          Use{' '}
          <a href="mailto:hello@selfstudys.com" className="text-primary font-medium underline hover:opacity-80">
            hello@selfstudys.com
          </a>{' '}
          to ask your queries.
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6"
          variants={fadeInUp}
          custom={6}
        >
          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full md:w-1/2 bg-muted p-6 rounded-lg shadow space-y-4 text-left"
          >
            <label className="block">
              <span className="text-sm font-medium text-foreground flex items-center gap-1">
                <User size={16} /> Your Name
              </span>
              <input
                type="text"
                {...register('name')}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-background text-foreground"
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground flex items-center gap-1">
                <Phone size={16} /> Mobile Number
              </span>
              <input
                type="text"
                {...register('number')}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-background text-foreground"
                placeholder="Enter your number"
              />
              {errors.number && <p className="text-red-500 text-sm">{errors.number.message}</p>}
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground flex items-center gap-1">
                <MessageCircle size={16} /> Message
              </span>
              <textarea
                {...register('message')}
                rows={4}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-background text-foreground"
                placeholder="Type your message..."
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
            </label>

            <button
              type="submit"
              className="inline-flex justify-end-safe gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md"
            >
              <FaWhatsapp size={18} /> Send to WhatsApp
            </button>
          </form>

          {/* Image */}
          <motion.img
            src={CustomerSupportPng}
            alt="Customer Support"
            className="w-full md:w-1/2 max-w-sm rounded-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
        </motion.div>
      </motion.div>

      {/* Google Map */}
      <motion.div
        className="w-full lg:w-11/12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <p className="text-2xl font-bold mb-4 text-center">Our Institute</p>
        <iframe
          className="w-full rounded-xl border shadow"
          height="450"
          loading="lazy"
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.954103678784!2d77.17869361114293!3d28.66109287554755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0288c42553df%3A0xf3a96063461dc2d!2sBase%20Academy!5e0!3m2!1sen!2sus!4v1751402744944!5m2!1sen!2sus"
        ></iframe>
      </motion.div>
    </div>
  );
};

export default ContactUs;
