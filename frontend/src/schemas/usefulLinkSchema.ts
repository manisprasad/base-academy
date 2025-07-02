// schemas/usefulLinkSchema.ts
import { z } from 'zod';

export const usefulLinkSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  link: z.string().url('Must be a valid URL'),
  des: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required')
});

export type UsefulLinkFormValues = z.infer<typeof usefulLinkSchema>;

interface IUseFulLink extends UsefulLinkFormValues {
  _id: string;
}
export type { IUseFulLink };
