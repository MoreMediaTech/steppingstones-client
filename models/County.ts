import * as zod from 'zod'

import { Prettify } from './helpers'
import {  sectionSchema } from './Section'
import {  districtSchema } from './District'

export const countySchema = zod.object({
  id: zod.string().nonempty({ message: 'ID is required' }),
  name: zod.string().nonempty({ message: 'Name is required' }),
  imageUrl: zod
    .string()
    .url({ message: 'Image URL is required' })
    .nonempty({ message: 'Image URL is required' }),
  logoIcon: zod
    .string()
    .url({ message: 'Logo Icon URL is required' })
    .nonempty({ message: 'Logo Icon URL is required' }),
  published: zod.boolean().optional(),
  viewCount: zod.number().optional(),
  isLive: zod.boolean().optional(),
  districts: zod.array(districtSchema).optional(),
  sections: zod.array(sectionSchema).optional(),
  createdAt: zod.string().nonempty({ message: 'Created At is required' }),
  updatedAt: zod.string().nonempty({ message: 'Updated At is required' }),
})


export const welcomeSchema = sectionSchema

export type WelcomeSchemaProps = zod.infer<typeof welcomeSchema>

export const lepSchema = sectionSchema

export type LepSchemaProps = zod.infer<typeof lepSchema>

export const newsSchema = sectionSchema

export type NewsSchemaProps = zod.infer<typeof newsSchema>


export const countyLepNewsWelcomeSchema = countySchema.extend({
  welcome: welcomeSchema,
  lep: lepSchema,
  news: newsSchema,
})

export const partialCountySchema = countyLepNewsWelcomeSchema.partial()

export type PartialCountySchemaProps = zod.infer<typeof partialCountySchema>

export type CountySchemaProps = Prettify<zod.infer<typeof countyLepNewsWelcomeSchema>>