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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useFetch } from '@/hooks/useFetchHook';
import { axiosInstance } from '@/api/axios';
import Loading from '../loading/Loading';
import { generalSettingSchema, type GeneralSettingsFormValues } from '@/schemas/generalSettingSchema';

const GeneralSettings: React.FC = () => {
  const [saving, setSaving] = useState(false);

  const { data, loading, error } = useFetch<{ data: GeneralSettingsFormValues }>(
    "/api/site-config/general",
    {
      method: "GET",
    }
  );

  const form = useForm<GeneralSettingsFormValues>({
    resolver: zodResolver(generalSettingSchema),
    defaultValues: {
      siteName: "",
      siteDescription: "",
      siteKeywords: [""],
      siteLogo: "",
      siteFavicon: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset(data.data);
    }
  }, [data, form]);

  const onSubmit = async (values: GeneralSettingsFormValues) => {
    try {
      setSaving(true);
      const response = await axiosInstance.put('/api/site-config/general', values);
      if (response.status === 200) {
        form.reset(values);
        toast.success('General settings updated successfully!');
      } else {
        toast.error('Failed to update general settings.');
      }
    } catch (err) {
      console.error('Error updating general settings:', err);
      toast.error('Something went wrong.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500 text-center">Failed to load general settings.</p>;

  return (
    <div className="mx-auto space-y-6 p-6 bg-background border rounded-lg shadow">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">General Settings</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          
          <FormField
            control={form.control}
            name="siteName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site Name</FormLabel>
                <FormControl>
                  <Input placeholder="Base Academy" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="siteDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site Description</FormLabel>
                <FormControl>
                  <Input placeholder="A platform for learning and sharing knowledge" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="siteKeywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site Keywords (comma separated)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="education, learning, academy"
                    value={field.value.join(', ')}
                    onChange={(e) =>
                      field.onChange(e.target.value.split(',').map(keyword => keyword.trim()))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="siteLogo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site Logo URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourcdn.com/logo.png" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="siteFavicon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Favicon URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourcdn.com/favicon.ico" {...field} />
                </FormControl>
                <FormMessage />
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

export default GeneralSettings;
