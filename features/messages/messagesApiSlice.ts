import { MessageProps } from '@lib/types'
import { messagesApiSlice } from 'app/api/apiSlice'

export const messagesApi = messagesApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendEnquiry: builder.mutation<MessageProps, Partial<MessageProps>>({
      query: (data) => ({
        url: 'messages/sendEnquiry',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
    }),
    sendEmail: builder.mutation<
      { message: string; success: boolean },
      MessageProps
    >({
      query: (data) => ({
        url: 'messages/sendEmail',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
    }),
    getAllInAppEnquiryMsg: builder.query<MessageProps[], void>({
      query: () => ({
        url: 'messages/',
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map((email) => ({
                type: 'Messages' as const,
                id: email.id,
              })),
              { type: 'Messages', id: 'LIST' },
            ]
          : [{ type: 'Messages', id: 'LIST' }],
    }),
    getMessageById: builder.query<MessageProps, string>({
      query: (id) => ({
        url: `messages/${id}`,
      }),
      providesTags: (result, error, arg) => [
        { type: 'Messages', id: result?.id },
      ],
    }),
    updateMsgStatusById: builder.mutation<
      { message: string; success: true },
      {id: string; isRead: boolean; isArchived: boolean; }
    >({
      query: (data) => ({
        url: `messages/status/${data.id}`,
        method: 'PATCH',
        body: { isRead: data.isRead, isArchived: data.isArchived },
      }),
    }),
    deleteMailById: builder.mutation<
      { message: string; success: true },
      string
    >({
      query: (id) => ({
        url: `messages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Messages', id: arg }],
    }),
    deleteManyMail: builder.mutation<
      { message: string; success: true },
      string[]
    >({
      query: (ids: string[]) => ({
        url: `messages/delete-many`,
        method: 'DELETE',
        body: { ids },
      }),
      invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
    }),
  }),
})

export const {
  useSendEnquiryMutation,
  useGetAllInAppEnquiryMsgQuery,
  useGetMessageByIdQuery,
  useDeleteMailByIdMutation,
  useSendEmailMutation,
  useDeleteManyMailMutation,
  useUpdateMsgStatusByIdMutation,
} = messagesApi
