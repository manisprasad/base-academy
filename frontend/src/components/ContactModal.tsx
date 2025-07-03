import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { X, Send } from "lucide-react";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/api/axios";
import axios from "axios";

// Zod Schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .optional()
    .or(z.literal("")),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactModal = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  const { control, handleSubmit, reset } = form;

  const onSubmit = async (_: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await axiosInstance.post("/api/contact/email", {
        name: form.getValues("name"),
        phone: form.getValues("phone"),
        query: form.getValues("message"),
      });

      await axios.post("/api/contact/telegram", {
        name: form.getValues("name"),
        phone: form.getValues("phone"),
        query: form.getValues("message"),
      });
      
      setIsSuccess(true);
      toast.success("Message sent!, We Will Get Back To You Soon");
      setTimeout(() => {
        closeModal();
        setTimeout(() => {
          reset();
          setIsSuccess(false);
        }, 300);
      }, 2000);
    } catch (err) {
      toast.error("Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    document.getElementById("contact-modal")?.classList.add("hidden");
  };

  return (
    <div
      id="contact-modal"
      className="fixed inset-0 bg-background/80 dark:bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="px-4 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <motion.div
          className="rounded-2xl border bg-background shadow-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25 }}
        >
          {/* Header */}
          <div className="p-4 border-b bg-muted flex justify-between items-center">
            <h3 className="text-lg font-semibold text-foreground">Contact Us</h3>
            <button onClick={closeModal}>
              <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {isSuccess ? (
              <motion.div
                className="text-center py-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-2">
                  Message Sent!
                </h4>
                <p className="text-muted-foreground">
                  We’ll get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 9876543210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="What can we help you with?" rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactModal;
