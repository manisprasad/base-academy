// src/schemas/Notes.schema.ts
import { z } from "zod";

export const NotesZodSchema = z.object({
  title: z.string().min(1, "Title is required"),
  des: z.string().min(1, "Description is required"),
  link: z.string().url("Invalid URL").min(1, "Link is required"),
  category: z.array(z.string()).min(1, "Category is required"),
  subject: z.string().min(1, "Subject is required").optional(),
  class: z.string().min(1, "Class is required").optional(),
  isFree: z.boolean(),
  price: z.number().min(0, "Price must be a positive number").optional(),
  thumbnail: z.string().url("Invalid URL").optional(),
  tags: z.array(z.string()).optional(),
  likes: z.number().default(0),
  views: z.number().default(0),
});

export type NotesType = z.infer<typeof NotesZodSchema>;
