import { partnerApiSlice } from 'app/api/apiSlice'

export const partnerApi = partnerApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPartnerById: builder.query({
      query: ({ id }) => ({
        url: `/partners/${id}`,
      }),
      providesTags: [{ type: 'Partner' }],
    }),
    createPartnerData: builder.mutation({
      query: (data) => ({
        url: `/partners`,
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Partner' }],
    }),
    updatePartnerData: builder.mutation({
      query: (data) => ({
        url: `/partners/${data.id}`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Partner' }],
    }),
    deletePartnerData: builder.mutation({
      query: ({ id }) => ({
        url: `/partners/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Partner' }],
    }),
    getAllPartnerData: builder.query({
      query: () => ({
        url: `/partners`,
      }),
      providesTags: [{ type: 'Partner' }],
    }),
  }),
})

export const {
  useGetPartnerByIdQuery,
  useCreatePartnerDataMutation,
  useUpdatePartnerDataMutation,
  useDeletePartnerDataMutation,
  useGetAllPartnerDataQuery,
} = partnerApi
