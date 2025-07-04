import { z } from 'zod';

// ----- Video Schema -----
export const VideoSchema = z.object({
  videoId: z.string(),
  title: z.string(),
  description: z.string(),
  duration: z.string(),
  thumbnails: z.object({
    low: z.string(),
    max: z.string(),
    high: z.string()
  }),
  // Add more fields here if needed
});

export type Video = z.infer<typeof VideoSchema>;

// ----- Playlist Schema -----
export const PlaylistSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  playListId: z.string(),
  playlistThumbnail: z.string(),
  videos: z.array(VideoSchema),
  orderedId: z.number(),
});

export type Playlist = z.infer<typeof PlaylistSchema>;

// ----- CourseContentItem Schema -----
export const CourseContentItemSchema = z.object({
  type: z.union([z.literal("video"), z.literal("playlist")]),
  position: z.number(),
  video: VideoSchema.optional(),
  playlist: PlaylistSchema.optional(),
});

export type CourseContentItem = z.infer<typeof CourseContentItemSchema>;

// ----- Course Schema -----
export const CourseSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  category: z.array(z.string()),
  price: z.number(),
  viewsCount: z.number(),
  likesCount: z.number(),
  enrolledUserCount: z.number(),
  isFree: z.boolean(),
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).optional(),
  prerequisites: z.array(z.string()),
  courseThumbnail: z.string(),
  shortDescription: z.string(),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  courseLink: z.array(z.object({
    link: z.string(),
    position: z.number(),
  })),
  language: z.string(),
  duration: z.number().optional(),
  courseContent: z.array(CourseContentItemSchema),
});

export type Course = z.infer<typeof CourseSchema>;
