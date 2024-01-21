import {
  type PartialFolderProps,
  type MessageFolderProps,
  type PartialMessageSchemaProps,
} from "@models/Messages";
import { messagesApiSlice } from "app/global-state/api/apiSlice";

export const messagesApi = messagesApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendEnquiry: builder.mutation<
      { message: string; success: boolean },
      PartialMessageSchemaProps
    >({
      query: (data) => ({
        url: "/messages/send-enquiry",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: [{ type: "Messages", id: "LIST" }],
    }),
    sendEmail: builder.mutation<
      { message: string; success: boolean },
      PartialMessageSchemaProps
    >({
      query: (data) => ({
        url: "/messages/send-mail",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: [{ type: "Messages", id: "LIST" }],
    }),

    getMessagesForFolder: builder.mutation<
      Partial<MessageFolderProps[]>,
      { folderName: string }
    >({
      query: (data) => ({
        url: "/messages/folder",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Messages", id: "LIST" },
      ],
    }),
    getMessageInFolder: builder.mutation<
      Partial<MessageFolderProps[]>,
      { folderName: string; messageId: string }
    >({
      query: (data) => ({
        url: `/messages/folder/${data.messageId}`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Messages", id: "LIST" },
      ],
    }),
    getFoldersWithMessagesCount: builder.query<
      {
        specialFolders: PartialFolderProps[];
        otherFolders: PartialFolderProps[];
      },
      void
    >({
      query: () => ({
        url: "/messages/folder",
      }),
      providesTags: (result, error, arg) => [
        { type: "Messages", id: "LIST" },
      ],
    }),
    getMessageById: builder.query<PartialMessageSchemaProps, string>({
      query: (id) => ({
        url: `/messages/${id}`,
      }),
      providesTags: (result, error, arg) => [
        { type: "Messages", id: result?.id },
      ],
    }),
    updateMsgStatusById: builder.mutation<
      { message: string; success: true },
      { id: string; isRead: boolean; isArchived: boolean }
    >({
      query: (data) => ({
        url: `/messages/status/${data.id}`,
        method: "PATCH",
        body: { isRead: data.isRead, isArchived: data.isArchived },
      }),
    }),
    deleteMailById: builder.mutation<
      { message: string; success: true },
      string
    >({
      query: (id) => ({
        url: `/messages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Messages", id: arg }],
    }),
    deleteManyMail: builder.mutation<
      { message: string; success: true },
      string[]
    >({
      query: (ids: string[]) => ({
        url: `/messages/delete-many`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: [{ type: "Messages", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useSendEnquiryMutation,
  useGetMessagesForFolderMutation,
  useGetFoldersWithMessagesCountQuery,
  useGetMessageInFolderMutation,
  useGetMessageByIdQuery,
  useDeleteMailByIdMutation,
  useSendEmailMutation,
  useDeleteManyMailMutation,
  useUpdateMsgStatusByIdMutation,
} = messagesApi;
