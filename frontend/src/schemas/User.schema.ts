import { z } from "zod";


const Gender = z.enum(["Male", "Female", "Other"]);
const Stream = z.enum(["Science", "Commerce", "Arts"]);
const Roles = z.enum(["Student", "Teacher"]);
import { CourseSchema } from "@/types/courses";


export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email().optional(),
  gender: Gender,
  phone: z.string(),
  school: z.string().optional(),
  classes: z.union([z.literal("4"), z.literal("5"), z.literal("6"), z.literal("7"), z.literal("8"), z.literal("9"), z.literal("10"), z.literal("11"), z.literal("12")]),
  stream: Stream.optional(),
  subjects: z.array(z.string()),
  bio: z.string().optional(),
  profileImage: z.string().url().optional(),
  role: Roles, 
  isVerified: z.boolean(),
  coursesPurchased: CourseSchema, 
});

export type UserType = z.infer<typeof UserSchema>;
