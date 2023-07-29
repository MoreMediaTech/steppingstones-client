import * as z from 'zod';

export const contentFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Title must be at least 2 characters',
    })
    .nonempty({ message: 'Title is required' }),
  isLive: z.boolean(),
  content: z.string().nonempty({ message: 'Content is required' }),
  author: z.string().optional(),
  imageFile: z
    .string()
    .optional(),
  summary: z
    .string()
    .min(10, {
      message: 'Summary must be at least 10 characters.',
    }).optional(),
})

export type ContentFormProps = z.infer<typeof contentFormSchema>