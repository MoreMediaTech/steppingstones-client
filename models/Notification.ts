import * as z from 'zod';
import { Prettify } from './helpers';

export enum NotificationTypes {
  NEW_MESSAGE = 'NEW_MESSAGE',
  NEW_COMMENT = 'NEW_COMMENT',
  NEW_FEEDBACK = 'NEW_FEEDBACK',
  NEW_CONTENT = 'NEW_CONTENT',
}

export const notificationSchema = z.object({
    id: z.string().optional(),
    type: z.nativeEnum(NotificationTypes),
    title: z.string(),
    body: z.string(),
    isRead: z.boolean().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    userId: z.string().optional(),
    sectionId: z.string().optional(),
});

export const partialNotificationSchema = notificationSchema.partial();

export type NotificationSchemaProps = Prettify<z.infer<typeof notificationSchema>>;
export type PartialNotificationSchemaProps = Prettify<z.infer<typeof partialNotificationSchema>>;

