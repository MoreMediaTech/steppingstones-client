import React from "react";
import { FaRegClock } from "react-icons/fa";

// zod schemas
import { PartialNotificationSchemaProps } from "@models/Notification";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { getRelativeTime } from "@lib/getRelativeTime";


export default function NotificationItem({
  notification,
}: {
  notification: PartialNotificationSchemaProps;
}) {
  return (
    <Card>
      <CardHeader className="flex w-full flex-row items-center justify-between text-sm ">
        <CardTitle>
          <Badge>{notification.type}</Badge>
        </CardTitle>
        <CardDescription className="flex items-center">
          <FaRegClock fontSize={16} className="mr-2" /> {getRelativeTime(notification.createdAt as string)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {notification.title}
            </p>
            <p className="text-sm text-muted-foreground">{notification.body}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
