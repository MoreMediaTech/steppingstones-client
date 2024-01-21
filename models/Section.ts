import { Prettify } from './helpers';
import * as z from 'zod';

import { partialCountySchema } from './County';

export const sectionSchema = z.object({
  id: z.string({ required_error: 'ID is required' }),
  name: z.string({ required_error: 'Name is required' }),
  title: z.string({ required_error: 'Title is required' }),
  content: z.string({ required_error: 'Content is required' }),
  isLive: z.boolean(),
  isSubSection: z.boolean(),
  logoIcon: z.string({ required_error: 'Logo Icon URL is required' }).url({ message: 'Logo icon must be a URL'}),
  imageUrl: z.string({ required_error: 'Image URL is required' }),
  videoUrl: z.string({ required_error: 'Video URL is required' }),
  videoTitle: z.string({ required_error: 'Video Title is required' }),
  videoDescription: z
  .string({ required_error: 'Video Description is required' }),
  author: z.string({ required_error: 'Author is required' }),
  summary: z.string({ required_error: 'Summary is required' }),
  createdAt: z.string({ required_error: 'Created At is required' }),
  updatedAt: z.string({ required_error: 'Updated At is required' }),
})

export const partialSectionSchema = sectionSchema.extend({
  county: partialCountySchema,
  subsections: z.array(sectionSchema),
}).partial()

export type SectionSchemaProps = Prettify<z.infer<typeof sectionSchema>>

export type PartialSectionSchemaProps = Prettify<z.infer<typeof partialSectionSchema>>



