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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTelegram, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { useFetch } from '@/hooks/useFetchHook';
import { useEffect, useState } from 'react';
import Loading from '../loading/Loading';
import { axiosInstance } from '@/api/axios';
import { toast } from 'sonner';

const startsWithDomain = (domain: string) =>
    z.string()
        .url('Must be a valid URL')
        .refine(url => url.startsWith(domain), {
            message: `URL must start with ${domain}`,
        });

const socialSchema = z.object({
    twitter: z.union([startsWithDomain('https://x.com/'), z.literal('')]).optional(),
    instagram: z.union([startsWithDomain('https://instagram.com/'), z.literal('')]).optional(),
    youtube: z.union([startsWithDomain('https://youtube.com/'), z.literal('')]).optional(),
    facebook: z.union([startsWithDomain('https://facebook.com/'), z.literal('')]).optional(),
    telegram: z.union([startsWithDomain('https://t.me/'), z.literal('')]).optional(),
    whatsapp: z.union([startsWithDomain('https://wa.me/'), z.literal('')]).optional(),
    discord: z.union([startsWithDomain('https://discord.com/'), z.literal('')]).optional(),
    linkedin: z.union([startsWithDomain('https://linkedin.com/in/'), z.literal('')]).optional(),
    github: z.union([startsWithDomain('https://github.com/'), z.literal('')]).optional(),
});

type SocialFormValues = z.infer<typeof socialSchema>;

const SocialLinks: React.FC = () => {
    const [saving , setSaving] = useState<boolean>(false);
    const { data, loading, error } = useFetch<{ data: SocialFormValues }>(
        "/api/site-config/social-links",
        {
            method: "GET",
        }
    );


    console.log('Fetched Social discord:', data?.data.discord);

    console.log(data)

    const form = useForm<SocialFormValues>({
        resolver: zodResolver(socialSchema),
        defaultValues: {
            twitter: "",
            linkedin: "",
            github: "",
            instagram: "",
            youtube: "",
            facebook: "",
            telegram: "",
            whatsapp: "",
            discord: "",
        },
    });


    useEffect(() => {
        if (data?.data) {
            form.reset(data.data);
        }
    }, [data, form]);

    const onSubmit = async (data: SocialFormValues) => {
       try {
            setSaving(true);
            const response = await axiosInstance.put('/api/site-config/social-links', data);
            if(response.status === 200) {
                form.reset(data);
                toast.success('Social links updated successfully!');
                return;
            }
            toast.error('Failed to update social links. Please try again.');
       } catch (error) {
            console.error('Error updating social links:', error);
            toast.error('Failed to update social links. Please try again.');
       } finally {
        setSaving(false);
       }
    };

    if(loading){
        return <Loading />
    }
    
    if (error) {
        console.error('Error fetching social links:', error);
        return <div className="text-red-500">Failed to load social links.</div>;
    }
    return (
        <div className=" mx-auto space-y-6 p-6 bg-background border rounded-lg shadow">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Social Links
            </h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Twitter */}
                    <FormField
                        control={form.control}
                        name="twitter"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                    <FaTwitter className="h-4 w-4 text-sky-500" />
                                    Twitter
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="https://twitter.com/yourhandle" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* LinkedIn */}
                    <FormField
                        control={form.control}
                        name="linkedin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                    <FaLinkedin className="h-4 w-4 text-blue-600" />
                                    LinkedIn
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* GitHub */}
                    <FormField
                        control={form.control}
                        name="github"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                    <FaGithub className="h-4 w-4 text-muted-foreground" />
                                    GitHub
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="https://github.com/yourusername" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* instagram */}
                    <FormField
                        control={form.control}
                        name="instagram"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                    <FaInstagram className='text-red-400' />
                                    Instagram
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="https://instagram.com/yourhandle" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* youtube */}
                    <FormField
                        control={form.control}
                        name="youtube"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                    <FaYoutube className='text-red-500' />
                                    YouTube
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="https://youtube.com/yourchannel" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* facebook */}
                    <FormField
                        control={form.control}
                        name="facebook"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                    <FaFacebook className='text-blue-800' />
                                    Facebook
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="https://facebook.com/yourpage" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* telegram */}
                    <FormField
                        control={form.control}
                        name="telegram"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                    <FaTelegram className='text-blue-400' />
                                    Telegram
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="https://t.me/yourchannel" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* whatsapp */}
                    <FormField
                        control={form.control}
                        name="whatsapp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                    <FaWhatsapp className='text-green-300' />
                                    WhatsApp
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="https://wa.me/yourwhatsappnumber" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <Button disabled={saving} type="submit" className="w-full">
                        {
                            saving ? "...saving" : "Save"
                        }
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SocialLinks;
