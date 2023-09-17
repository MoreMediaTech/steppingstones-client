import * as z from 'zod'
import validator from 'validator'

import { Prettify } from './helpers'

export enum Role {
  PARTNER = 'PARTNER',
  COUNTY_EDITOR = 'COUNTY_EDITOR',
  SS_EDITOR = 'SS_EDITOR',
  USER = 'USER',
}

export const OrganisationSchema = z.object({
  id: z.string().nonempty({}).optional(),
  name: z.string().nonempty({}).optional(),
  userId: z.string().nonempty({}).optional(),
  createdAt: z.string().nonempty({}).optional(),
})

export const UserSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Please enter a name with at least 2 characters',
    })
    .nonempty({
      message: 'Please enter your name',
    }),
  email: z
    .string()
    .nonempty({
      message: 'Please enter your email',
    })
    .email({
      message: 'Please enter a valid email',
    })
    .trim()
    .toLowerCase()
    .refine(validator.isEmail),
  contactNumber: z
    .string()
    .nonempty({
      message: 'You must enter a contact number',
    })
    .regex(/^[0-9]{11}$/, {
      message: 'Please enter a valid contact number',
    })
    .length(11, { message: 'Contact number must be 11 digits' })
    .transform((value) => {
      return value.replace(/ /g, '')
    })
    .refine((value) => validator.isMobilePhone(value, 'en-GB'), {
      message: 'Please enter a valid contact number',
    }),
  imageUrl: z.string().optional(),
  postCode: z
    .string()
    .nonempty({
      message: 'You must enter a postcode',
    })
    .regex(/^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i, {
      message: 'Please enter a valid UK postcode',
    })
    .transform((value) => {
      return value.replace(/ /g, '')
    })
    .refine((value) => validator.isPostalCode(value, 'GB'), {
      message: 'Please enter a valid UK postcode',
    }),
  district: z.string().nonempty({
    message: 'You must enter a district',
  }),
  county: z.string().nonempty({
    message: 'You must enter a county',
  }),
  organisation: z
    .string()
    .nonempty({
      message: 'You must enter an organisation',
    })
    .optional(),
  emailVerified: z.boolean().default(false),
  isAdmin: z.boolean().default(false),
  acceptTermsAndConditions: z.boolean().default(false),
  role: z.nativeEnum(Role),
  isSuperAdmin: z.boolean().default(false).optional(),
  createdAt: z.string().nonempty({}).optional(),
  updatedAt: z.string().nonempty({}).optional(),
})

export const partialUserSchema = UserSchema.partial()

export const userSchemaWithIdAndOrganisation = UserSchema.extend({
  id: z.string().nonempty({}).optional(),
  organisation: OrganisationSchema.optional(),
})

export const partialUserWithIdSchema = userSchemaWithIdAndOrganisation.partial()

export type OrganisationSchemaType = z.infer<typeof OrganisationSchema>

export type UserSchemaType = z.infer<typeof UserSchema>

export type PartialUserSchemaType = z.infer<typeof partialUserSchema>

export type UserSchemaWithIdType = Prettify<z.infer<
  typeof userSchemaWithIdAndOrganisation
>>

export type PartialUserWithIdType = Prettify<z.infer<typeof partialUserWithIdSchema>>


