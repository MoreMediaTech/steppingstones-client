import { notificationsApiSlice } from "@app/global-state/api/apiSlice";
import type { PartialNotificationSchemaProps } from "@models/Notification";


const notificationsApi = notificationsApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<PartialNotificationSchemaProps[], void>({
      query: () => ({
        url: "/notifications/",
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map((notification) => ({
                type: "Notifications" as const,
                id: notification.id,
              })),
              { type: "Notifications", id: "LIST" },
            ]
          : [{ type: "Notifications", id: "LIST" }],
    }),
    sendNotificationsToUser: builder.mutation<
      { message: string; success: boolean },
      PartialNotificationSchemaProps
    >({
      query: (data) => ({
        url: "/notifications/",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: [{ type: "Notifications", id: "LIST" }],
    }),
    sendNotificationsToAllUsers: builder.mutation<
      { message: string; success: boolean },
      PartialNotificationSchemaProps
    >({
      query: (data) => ({
        url: "/notifications/all",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: [{ type: "Notifications", id: "LIST" }],
    }),
    markNotificationAsRead: builder.mutation<
      { message: string; success: boolean },
      string
    >({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Notifications", id: "LIST" }],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useSendNotificationsToUserMutation,
  useSendNotificationsToAllUsersMutation,
  useMarkNotificationAsReadMutation,
} = notificationsApi;
