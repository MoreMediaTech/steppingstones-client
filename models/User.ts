import * as z from "zod";
import validator from "validator";

import { Prettify } from "./helpers";

export enum Role {
  PARTNER = "PARTNER",
  EDITOR = "EDITOR",
  ADMIN = "ADMIN",
  SUPERADMIN = "SUPERADMIN",
  USER = "USER",
}

export const OrganisationSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  userId: z.string().optional(),
  createdAt: z.string().optional(),
});

export const UserSchema = z.object({
  name: z.string({ required_error: "You must enter your name" }).min(2, {
    message: "Please enter a name with at least 2 characters",
  }),

  email: z
    .string({ required_error: "You must enter your email" })
    .email({
      message: "Please enter a valid email",
    })
    .trim()
    .toLowerCase()
    .refine(validator.isEmail),
  contactNumber: z
    .string()
    .regex(/^[0-9]{11}$/, {
      message: "Please enter a valid contact number",
    })
    .length(11, { message: "Contact number must be 11 digits" })
    .transform((value) => {
      return value.replace(/ /g, "");
    })
    .refine((value) => validator.isMobilePhone(value, "en-GB"), {
      message: "Please enter a valid contact number",
    })
    .optional(),
  imageUrl: z.string().optional(),
  postCode: z
    .string({ required_error: "You must enter a postcode" })
    .regex(/^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i, {
      message: "Please enter a valid UK postcode",
    })
    .transform((value) => {
      return value.replace(/ /g, "");
    })
    .refine((value) => validator.isPostalCode(value, "GB"), {
      message: "Please enter a valid UK postcode",
    })
    .optional(),
  district: z.string(),
  county: z.string(),
  organisation: z.string().optional(),
  emailVerified: z.boolean().default(false),
  isAdmin: z.boolean().default(false),
  isDisabled: z.boolean().default(false),
  acceptTermsAndConditions: z.boolean().default(false),
  role: z.nativeEnum(Role),
  isSuperAdmin: z.boolean().default(false).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const partialUserSchema = UserSchema.partial();

export const userSchemaWithIdAndOrganisation = UserSchema.extend({
  id: z.string().optional(),
  organisation: OrganisationSchema.optional(),
});

export const partialUserWithIdSchema =
  userSchemaWithIdAndOrganisation.partial();

export type OrganisationSchemaType = z.infer<typeof OrganisationSchema>;

export type UserSchemaType = z.infer<typeof UserSchema>;

export type PartialUserSchemaType = z.infer<typeof partialUserSchema>;

export type UserSchemaWithIdType = Prettify<
  z.infer<typeof userSchemaWithIdAndOrganisation>
>;

export type PartialUserWithIdType = Prettify<
  z.infer<typeof partialUserWithIdSchema>
>;
