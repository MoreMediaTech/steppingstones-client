import * as z from "zod";

import { Prettify } from "./helpers";

export const economicDataSchema = z.object({
  id: z.string({ required_error: "ID is required" }),
  title: z.string({ required_error: "Title is required" }),
  stats: z.string({ required_error: "Stats is required" }),
  descriptionLine1: z
    .string({ required_error: "Description Line 1 is required" }),
  descriptionLine2: z
    .string({ required_error: "Description Line 2 is required" }),
  linkName: z.string({ required_error: "Link Name is required" }),
  linkUrl: z.string({ required_error: "Link URL is required" }),
  createdAt: z.string({ required_error: "Created At is required" }),
  updatedAt: z.string({ required_error: "Updated At is required" }),
});

export const partialEconomicDataSchema = economicDataSchema.partial();

export type EconomicDataSchemaProps = Prettify<z.infer<typeof economicDataSchema>>;
export type PartialEconomicDataSchemaProps = Prettify<z.infer<typeof partialEconomicDataSchema>>;

export const districtSectionSchema = z.object({
  id: z.string({ required_error: "ID is required" }),
  name: z.string({ required_error: "Name is required" }),
  title: z.string({ required_error: "Title is required" }),
  content: z.string({ required_error: "Content is required" }),
  isLive: z.boolean(),
  isSubSection: z.boolean(),
  logoIcon: z
    .string({ required_error: "Logo Icon is required" })
    .url({ message: "Logo icon must be a URL" })
    ,
  imageUrl: z.string({ required_error: "Image URL is required" }),
  videoUrl: z.string({ required_error: "Video URL is required" }),
  videoTitle: z.string({ required_error: "Video Title is required" }),
  videoDescription: z
    .string({ required_error: "Video Description is required" }),
  author: z.string({ required_error: "Author is required" }),
  summary: z.string({ required_error: "Summary is required" }),
  isEconomicData: z.boolean(),
  economicDataWidgets: z.array(economicDataSchema),
  createdAt: z.string({ required_error: "Created At is required" }),
  updatedAt: z.string({ required_error: "Updated At is required" }),
});

export const partialDistrictSectionSchema = districtSectionSchema.partial();

export type DistrictSectionSchemaProps = Prettify<
  z.infer<typeof districtSectionSchema>
>;

export type PartialDistrictSectionSchemaProps = Prettify<
  z.infer<typeof partialDistrictSectionSchema>
>;

export const districtSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string(),
  logoIcon: z.string(),
  isLive: z.boolean(),
  county: z.object({
    id: z.string(),
    name: z.string(),
    logoIcon: z.string().url(),
  }),
  districtSections: z.array(districtSectionSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const partialDistrictSchema = districtSchema.partial();

export type DistrictSchemaProps = Prettify<z.infer<typeof districtSchema>>;

export type PartialDistrictSchemaProps = Prettify<
  z.infer<typeof partialDistrictSchema>
>;
