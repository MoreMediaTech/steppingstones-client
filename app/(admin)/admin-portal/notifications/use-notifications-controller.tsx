"use client";

import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastAction } from "@components/ui/toast";
import { useToast } from "@components/ui/use-toast";
import { SubmitHandler, useForm } from "react-hook-form";

// redux global state (Model)
import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useSendNotificationsToAllUsersMutation,
  useSendNotificationsToUserMutation,
} from "@app/global-state/features/notifications/notifications-api-slice";
import { useGetUsersQuery } from "@app/global-state/features/user/usersApiSlice";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "@app/global-state/helper";

// zod schemas
import {
  partialNotificationSchema,
  PartialNotificationSchemaProps,
  NotificationTypes,
} from "@models/Notification";

export default function useNotificationsController() {
  const { toast } = useToast();
  const [notificationType] = useState<NotificationTypes[]>([
    NotificationTypes.NEW_COMMENT,
    NotificationTypes.NEW_CONTENT,
    NotificationTypes.NEW_FEEDBACK,
    NotificationTypes.NEW_MESSAGE,
  ]);

  // get all users
  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();

  // get the user name and Id from the users
  const userNames = users?.map((user) => ({
    id: user.id,
    name: user.name,
  }));

  // get all notifications
  const {
    data: notifications,
    isLoading: isLoadingNotifications,
    refetch,
  } = useGetNotificationsQuery();

  // notifications mutations
  const [markNotificationAsRead, { isLoading: isMarkingAsRead }] =
    useMarkNotificationAsReadMutation();
  const [sendNotificationsToAllUsers, { isLoading: isSendingToAllUsers }] =
    useSendNotificationsToAllUsersMutation();
  const [sendNotificationsToUser, { isLoading: isSendingToUser }] =
    useSendNotificationsToUserMutation();

  const form = useForm<PartialNotificationSchemaProps>({
    resolver: zodResolver(partialNotificationSchema),
    defaultValues: {
      title: "",
      body: "",
      type: NotificationTypes.NEW_COMMENT,
    },
  });

  /**
   * @description Mark notification as read
   * @param {string} id
   * @returns {Promise<void>}
   */
  const handleMarkNotificationAsRead = useCallback(async (id: string) => {
    try {
      const response = await markNotificationAsRead(id).unwrap();
      if (response.success) {
        toast({
          title: "Success!",
          description: response.message,
        });
        refetch();
      } else {
        toast({
          title: "Error!",
          description: response.message,
        });
      }
    } catch (error) {
      if (isErrorWithMessage(error)) {
        const errMsg =
          "error" in error ? error.error : JSON.stringify(error.message);
        toast({
          title: "Error!",
          description:
            (errMsg as string) || "Unable to mark notification as read",
        });
      } else if (isFetchBaseQueryError(error)) {
        toast({
          title: "Error!",
          description: error.message,
        });
      }
    }
  }, []);

  /**
   * @description Send notification to all users
   * @param {PartialNotificationSchemaProps} data
   * @returns {Promise<void>}
   */
  const handleSendNotificationsToAllUsers: SubmitHandler<PartialNotificationSchemaProps> =
    useCallback(async (data) => {
      try {
        const response = await sendNotificationsToAllUsers(data).unwrap();
        if (response.success) {
          toast({
            title: "Success!",
            description: response.message,
          });
          form.reset();
          refetch();
        } else {
          toast({
            title: "Error!",
            description: response.message,
          });
        }
      } catch (error) {
        if (isErrorWithMessage(error)) {
          const errMsg =
            "error" in error ? error.error : JSON.stringify(error.message);
          toast({
            title: "Error!",
            description:
              (errMsg as string) || "Unable to send notification to all users",
          });
        } else if (isFetchBaseQueryError(error)) {
          toast({
            title: "Error!",
            description: error.message,
          });
        }
      }
    }, []);

  /**
   * @description Send notification to a user
   * @param {PartialNotificationSchemaProps} data
   * @returns {Promise<void>}
   */
  const handleSendNotificationsToUser: SubmitHandler<PartialNotificationSchemaProps> =
    useCallback(async (data) => {
      try {
        const response = await sendNotificationsToUser(data).unwrap();
        if (response.success) {
          toast({
            title: "Success!",
            description: response.message,
          });
          form.reset();
          refetch();
        } else {
          toast({
            title: "Error!",
            description: response.message,
          });
        }
      } catch (error) {
        if (isErrorWithMessage(error)) {
          const errMsg =
            "error" in error ? error.error : JSON.stringify(error.message);
          toast({
            title: "Error!",
            description:
              (errMsg as string) || "Unable to send notification to user",
          });
        } else if (isFetchBaseQueryError(error)) {
          toast({
            title: "Error!",
            description: error.message,
          });
        }
      }
    }, []);

  return {
    form,
    notifications,
    isLoadingNotifications,
    isMarkingAsRead,
    isSendingToAllUsers,
    isSendingToUser,
    notificationType,
    userNames,
    handleMarkNotificationAsRead,
    handleSendNotificationsToAllUsers,
    handleSendNotificationsToUser,
  };
}
