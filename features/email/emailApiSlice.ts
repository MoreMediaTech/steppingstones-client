import { MessageProps } from '@lib/types'
import { emailApiSlice } from 'app/api/apiSlice'

export const emailApi = emailApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendEnquiry: builder.mutation<MessageProps, Partial<MessageProps>>({
      query: (data) => ({
        url: 'email/sendEnquiry',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Email', id: 'LIST' }],
    }),
    sendEmail: builder.mutation<
      { message: string; success: boolean },
      MessageProps
    >({
      query: (data) => ({
        url: 'email/sendEmail',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Email', id: 'LIST' }],
    }),
    getAllMail: builder.query<MessageProps[], void>({
      query: () => ({ url: 'email/' }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map((email) => ({
                type: 'Email' as const,
                id: email.id,
              })),
              { type: 'Email', id: 'LIST' },
            ]
          : [{ type: 'Email', id: 'LIST' }],
    }),
    getMessageById: builder.query<MessageProps, string>({
      query: (id) => ({
        url: `email/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: 'Email', id: result?.id }],
    }),
    deleteMailById: builder.mutation<
      { message: string; success: true },
      string
    >({
      query: (id) => ({
        url: `email/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Email', id: arg }],
    }),
  }),
})

export const {
  useSendEnquiryMutation,
  useGetAllMailQuery,
  useGetMessageByIdQuery,
  useDeleteMailByIdMutation,
  useSendEmailMutation,
} = emailApi
