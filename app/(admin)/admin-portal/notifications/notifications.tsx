"use client";
import React from "react";

// components
import {
  SendNotificationForm,
  SendNotificationFormToUser,
} from "./send-notification-form";
import Header from "@components/Header";
import { Separator } from "@components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

// hooks (Controller)
import useNotificationsController from "./use-notifications-controller";
import NotificationItem from "./notification-item";
export function Notifications() {
  const {
    notifications,
    isLoadingNotifications,
    handleMarkNotificationAsRead,
  } = useNotificationsController();

  return (
    <section className="w-full ">
      <Tabs defaultValue="notifications" className="w-full">
        <TabsList>
          <TabsTrigger value="notifications">
            Notification to All Users
          </TabsTrigger>
          <TabsTrigger value="notification">Notification to User</TabsTrigger>
        </TabsList>
        <TabsContent value="notifications">
          <Header title="Create Notifications" order={2} />
          <SendNotificationForm />
        </TabsContent>
        <TabsContent value="notification">
          <Header title="Create Notifications" order={2} />
          <SendNotificationFormToUser />
        </TabsContent>
      </Tabs>

      <Separator className="my-6 w-full" />
      <Header title="Notifications" order={2} />
      <section className="grid grid-cols-1 gap-2 rounded-md border my-2 px-2 py-2">
        {notifications?.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </section>
    </section>
  );
}
