import * as z from 'zod';

import { sectionSchema } from './Section';

export const economicDataSchema = z.object({
     id: z.string().nonempty({ message: 'ID is required' }),
  title: z.string().nonempty({ message: 'Title is required' }),
  stats: z.string().nonempty({ message: 'Stats is required' }),
  descriptionLine1: z.string().nonempty({ message: 'Description Line 1 is required' }),
  descriptionLine2: z.string().nonempty({ message: 'Description Line 2 is required' }),
  linkName: z.string().nonempty({ message: 'Link Name is required' }),
  linkUrl: z.string().nonempty({ message: 'Link URL is required' }),
  createdAt: z.string().nonempty({ message: 'Created At is required' }),
  updatedAt: z.string().nonempty({ message: 'Updated At is required' }),
});

export const districtSectionSchema = sectionSchema.extend({
  economicData: z.array(economicDataSchema).optional(),
})

export type DistrictSectionSchemaProps = z.infer<typeof districtSectionSchema>

export const districtSchema = z.object({
    id: z.string(),
  name: z.string(),
  imageUrl: z.string(),
  logoIcon: z.string(),
  isLive: z.boolean(),
  districtSections: z.array(districtSectionSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type DistrictSchemaProps = z.infer<typeof districtSchema>;
