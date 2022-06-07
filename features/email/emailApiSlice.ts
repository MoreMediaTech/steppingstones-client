import { emailApiSlice } from 'app/api/apiSlice'

export const emailApi = emailApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendEnquiry: builder.mutation({
      query: (data) => ({
        url: 'email/sendEnquiry',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Email' }],
    }),
    sendEmail: builder.mutation({
      query: (data) => ({
        url: 'email/sendEmail',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Email' }],
    }),
    getAllMail: builder.query({
      query: (data) => ({
        url: 'email/getAllMail',
      }),
      providesTags: [{ type: 'Email' }],
    }),
    getMessageById: builder.query({
      query: (id) => ({
        url: `email/${id}`,
      }),
      providesTags: [{ type: 'Email' }],
    }),
    deleteMailById: builder.mutation({
      query: (id) => ({
        url: `email/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Email' }],
    }),
  }),
})

export const { useSendEnquiryMutation } = emailApi
