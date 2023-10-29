import * as z from 'zod';
import { Prettify } from './helpers';

export enum NotificationTypes {
  MESSAGE = 'MESSAGE',
  COMMENT = 'COMMENT',
  FEEDBACK = 'FEEDBACK',
  CONTENT = 'CONTENT',
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

