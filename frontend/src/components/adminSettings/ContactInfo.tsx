import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from "@/components/ui/switch";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import Loading from '../loading/Loading';
import { toast } from 'sonner';
import { useFetch } from '@/hooks/useFetchHook';
import { axiosInstance } from '@/api/axios';

import { z } from 'zod';


export const contactInfoSchema = z.object({
  contactEmail: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  contactPhone: z.array(z.string().min(1, "Phone number can't be empty")),
  contactFormEnabled: z.boolean(),
  mapEmbedUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type ContactInfoFormValues = z.infer<typeof contactInfoSchema>;

const ContactInfo: React.FC = () => {
  const [saving, setSaving] = useState(false);

  const { data, loading, error } = useFetch<{ data: ContactInfoFormValues }>(
    "/api/site-config/contact",
    {
      method: "GET",
    }
  );

  const form = useForm<ContactInfoFormValues>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      contactEmail: "",
      address: "",
      contactPhone: [],
      contactFormEnabled: false,
      mapEmbedUrl: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset(data.data);
    }
  }, [data, form]);

  const onSubmit = async (values: ContactInfoFormValues) => {
    try {
      setSaving(true);
      const response = await axiosInstance.put('/api/site-config/contact', values);
      if (response.status === 200) {
        form.reset(values);
        toast.success('Contact info updated successfully!');
        return;
      }
      toast.error('Failed to update contact info.');
    } catch (err) {
      console.error('Error updating contact info:', err);
      toast.error('Something went wrong.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.error('Error fetching contact info:', error);
    return <div className="text-red-500">Failed to load contact information.</div>;
  }

  return (
    <div className="mx-auto space-y-6 p-6 bg-background border rounded-lg shadow">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">Contact Information</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="contact@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St, City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Numbers (comma separated)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1234567890, 0987654321"
                    value={field.value.join(', ')}
                    onChange={(e) =>
                      field.onChange(e.target.value.split(',').map(num => num.trim()))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mapEmbedUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Map Embed URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://maps.google.com/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactFormEnabled"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel>Enable Contact Form</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button disabled={saving} type="submit" className="w-full">
            {saving ? "...saving" : "Save"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactInfo;