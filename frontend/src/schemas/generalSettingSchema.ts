import { z } from 'zod';

export const generalSettingSchema = z.object({
  siteName: z.string().min(1, "Site name is required"),
  siteDescription: z.string().min(1, "Description is required"),
  siteKeywords: z.array(z.string().min(1, "Keyword cannot be empty")),
  siteLogo: z.string().url("Logo must be a valid URL").or(z.literal("")),
  siteFavicon: z.string().url("Favicon must be a valid URL").or(z.literal("")),
});

export type GeneralSettingsFormValues = z.infer<typeof generalSettingSchema>;

