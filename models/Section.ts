import { Prettify } from "./helpers";
import * as z from "zod";

export enum SectionType {
  LOCAL_FEED_SECTION = "LOCAL_FEED_SECTION",
  FEED_SECTION = "FEED_SECTION",
  ABOVE_THE_FOLD_CONTENT = "ABOVE_THE_FOLD_CONTENT",
  ECONOMIC_DATA = "ECONOMIC_DATA",
  CHILD_SECTION = "CHILD_SECTION",
}

export const economicDataSchema = z.object({
  id: z.string({ required_error: "ID is required" }),
  ids: z.array(z.string()).optional(),
  title: z.string({ required_error: "Title is required" }),
  stats: z.string({ required_error: "Stats is required" }),
  descriptionLine1: z.string({
    required_error: "Description Line 1 is required",
  }),
  descriptionLine2: z.string({
    required_error: "Description Line 2 is required",
  }),
  sectionId: z.string({ required_error: "Local Feed Content ID is required" }),
  linkName: z.string({ required_error: "Link Name is required" }),
  linkUrl: z.string({ required_error: "Link URL is required" }),
  createdAt: z.string({ required_error: "Created At is required" }),
  updatedAt: z.string({ required_error: "Updated At is required" }),
});

export const sectionSchema = z.object({
  id: z.string({ required_error: "ID is required" }),
  ids: z.array(z.string()).optional(),
  name: z.string({ required_error: "Name is required" }),
  title: z.string({ required_error: "Title is required" }),
  content: z.string({ required_error: "Content is required" }),
  isLive: z.boolean(),
  isSubSection: z.boolean(),
  logoIcon: z
    .string({ required_error: "Logo Icon is required" })
    .url({ message: "Logo icon must be a URL" }),
  imageUrl: z.string({ required_error: "Image URL is required" }),
  videoUrl: z.string({ required_error: "Video URL is required" }),
  videoTitle: z.string({ required_error: "Video Title is required" }),
  videoDescription: z.string({ required_error: "Logo Icon is required" }),
  author: z.string({ required_error: "Author is required" }),
  summary: z.string({ required_error: "Summary is required" }),
  isEconomicData: z.boolean(),
  parentId: z.string({ required_error: "Parent ID is required" }).optional(),
  type: z.nativeEnum(SectionType),
  localFeedContentId: z
    .string({ required_error: "Local Feed Content ID is required" })
    .optional(),
  feedContentId: z
    .string({ required_error: "County ID is required" })
    .optional(),
  feedContent: z
    .object({
      id: z.string({ required_error: "ID is required" }),
      name: z.string({ required_error: "Name is required" }),
      logoIcon: z.string({ required_error: "Logo Icon is required" }).url(),
    })
    .optional(),
  parent: z
    .object({
      id: z.string({ required_error: "ID is required" }),
      name: z.string({ required_error: "Name is required" }),
    })
    .optional(),
  localFeedContent: z
    .object({
      id: z.string({ required_error: "ID is required" }),
      name: z.string({ required_error: "Name is required" }),
      logoIcon: z.string({ required_error: "Logo Icon is required" }).url(),
    })
    .optional(),
  createdAt: z.string({ required_error: "Created At is required" }),
  updatedAt: z.string({ required_error: "Updated At is required" }),
});

export const partialSectionSchema = sectionSchema
  .extend({
    economicDataWidgets: z.array(economicDataSchema).optional(),
  })
  .partial();

export type SectionSchemaProps = Prettify<z.infer<typeof sectionSchema>>;

export type PartialSectionSchemaProps = Prettify<
  z.infer<typeof partialSectionSchema>
>;
