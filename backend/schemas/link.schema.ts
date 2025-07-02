import {z} from 'zod';

export const LinkSchema = z.object({
    title: z.string().min(1, "Title is required"),
    des: z.string().min(1, "Description is required"),
    link: z.string().url("Invalid URL").min(1, "Link is required"),
    category: z.array(z.string()).min(1, "Category is required")
});

export type LinkType = z.infer<typeof LinkSchema>;