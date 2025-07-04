import { z } from "zod";
import { Types } from "mongoose";
import { Roles } from "../config/roleList";

const Gender = z.enum(["Male", "Female", "Other"]);
const Stream = z.enum(["Science", "Commerce", "Arts"]);

// Zod schema for IUser
export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email().optional(),
  gender: Gender,
  phone: z.string(),
  password: z.string(),
  school: z.string().optional(),
  classes: z.union([z.literal("4"), z.literal("5"), z.literal("6"), z.literal("7"), z.literal("8"), z.literal("9"), z.literal("10"), z.literal("11"), z.literal("12")]),
  stream: Stream.optional(),
  subjects: z.array(z.string()),
  bio: z.string().optional(),
  profileImage: z.string().url().optional(),
  role: z.nativeEnum(Roles), 
  isVerified: z.boolean(),
  coursesPurchased: z.array(z.instanceof(Types.ObjectId)), // you can refine to z.instanceof(Types.ObjectId) if needed
});

export type IUser = z.infer<typeof UserSchema>;
