import * as z from "zod";
import { jsonSchema } from "./Section";

export const contentFormSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(2, {
    message: "Title must be at least 2 characters",
  }),
  isLive: z.boolean(),
  content: z.string().optional(),
  author: z.string().optional(),
  imageFile: z.string().optional(),
  videoUrl: z.string().optional(),
  videoTitle: z.string().optional(),
  videoDescription: z.string().optional(),
  summary: z.string().optional(),
});

export type ContentFormProps = z.infer<typeof contentFormSchema>;
