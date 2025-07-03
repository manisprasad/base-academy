import { z } from "zod";

// General Settings Schema
const generalSettingsSchema = z.object({
  siteName: z.string().optional(),
  siteDescription: z.string().optional(),
  siteKeywords: z.array(z.string()).optional(),
  siteLogo: z.string().optional(),
  siteFavicon: z.string().optional(),
});

// Contact Info Schema
const contactInfoSchema = z.object({
  contactEmail: z.string().email().optional(),
  address: z.string().optional(),
  contactPhone: z.array(z.string()).optional(),
  contactFormEnabled: z.boolean().optional(),
  mapEmbedUrl: z.string().url().optional(),
});

// Social Links Schema
const startsWithDomain = (domain: string) => 
  z.string()
    .url('Must be a valid URL')
    .refine(url => url.startsWith(domain), {
      message: `URL must start with ${domain}`,
    });

const socialLinksSchema = z.object({
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

// SEO Settings Schema
const seoSettingsSchema = z.object({
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  googleAnalyticsId: z.string().optional(),
  robotsTxt: z.string().optional(),
  sitemapUrl: z.string().url().optional(),
  openGraphImage: z.string().url().optional(),
});

// Theme Settings Schema
const themeSettingsSchema = z.object({
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  darkMode: z.boolean().optional(),
});

// Main Site Config Schema
const siteConfigSchema = z.object({
  _id : z.string().optional(),
  generalSettings: generalSettingsSchema.optional(),
  contactInfo: contactInfoSchema.optional(),
  socialLinks: socialLinksSchema.optional(),
  seoSettings: seoSettingsSchema.optional(),
  themeSettings: themeSettingsSchema.optional(),
});

// Type Inference
type SiteConfigType = z.infer<typeof siteConfigSchema>;
type GeneralSettingsType = z.infer<typeof generalSettingsSchema>;
type ContactInfoType = z.infer<typeof contactInfoSchema>;
type SocialLinksType = z.infer<typeof socialLinksSchema>;
type SeoSettingsType = z.infer<typeof seoSettingsSchema>;
type ThemeSettingsType = z.infer<typeof themeSettingsSchema>;

// Exports
export {
  siteConfigSchema,
  generalSettingsSchema,
  contactInfoSchema,
  socialLinksSchema,
  seoSettingsSchema,
  themeSettingsSchema,
};

export type {
  SiteConfigType,
  GeneralSettingsType,
  ContactInfoType,
  SocialLinksType,
  SeoSettingsType,
  ThemeSettingsType,
};
