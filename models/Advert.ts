import { Prettify } from './helpers';
import * as z from 'zod';


export const advertSchema = z.object({
  id: z.string({ required_error: 'ID is required' }),
  name: z.string({ required_error: 'Name is required' }),
  title: z.string({ required_error: 'Title is required' }),
  published: z.boolean(),
  isSubSection: z.boolean(),
  logoIcon: z.string({ required_error: 'Logo Icon URL is required' }).url({ message: 'Logo icon must be a URL'}),
  imageUrl: z.string({ required_error: 'Image URL is required' }),
  videoUrl: z.string({ required_error: 'Video URL is required' }),
  imageFile: z
    .string()
    .optional(),
  videoTitle: z.string({ required_error: 'Video Title is required' }),
  videoDescription: z
  .string({ required_error: 'Video Description is required' }),
  author: z.string({ required_error: 'Author is required' }),
  authorId: z.string({ required_error: 'Author ID is required' }).optional(),
  summary: z.string({ required_error: 'Summary is required' }),
  createdAt: z.string({ required_error: 'Created At is required' }),
  updatedAt: z.string({ required_error: 'Updated At is required' }),
})

export const partialAdvertSchema = advertSchema.partial()

export type AdvertSchemaProps = Prettify<z.infer<typeof advertSchema>>

export type PartialAdvertSchemaProps = Prettify<z.infer<typeof partialAdvertSchema>>