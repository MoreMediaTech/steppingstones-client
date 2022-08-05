import { PartnerData, IFormData } from '@lib/types'
import { partnerApiSlice } from 'app/api/apiSlice'

export const partnerApi = partnerApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPartnerById: builder.query<PartnerData, string>({
      query: (id: string) => ({
        url: `partners/${id}`,
      }),
      providesTags: [{ type: 'Partner' }],
    }),
    createPartnerData: builder.mutation<
      { success: boolean; message: string },
      IFormData
    >({
      query: (data) => ({
        url: `partners/`,
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Partner', id: 'List' }],
    }),
    updatePartnerData: builder.mutation<
      { success: boolean; message: string },
      IFormData
    >({
      query: (data) => ({
        url: `partners/${data.id}`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Partner', id: arg.id },
      ],
    }),
    deletePartnerData: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id: string) => ({
        url: `partners/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Partner', id: 'List' }],
    }),
    getAllPartnersData: builder.query<PartnerData[], void>({
      query: () => ({
        url: `partners/`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result?.map(
                (partnerData) =>
                  ({
                    type: 'Partner' as const,
                    id: partnerData?.id,
                  } as const)
              ),
              { type: 'Partner', id: 'LIST' },
            ]
          : [{ type: 'Partner', id: 'LIST' }],
    }),
    getAllPartnerData: builder.query<PartnerData[], string>({
      query: (id: string) => ({
        url: `partners/all/${id}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result?.map(
                (partnerData) =>
                  ({
                    type: 'Partner' as const,
                    id: partnerData?.id,
                  } as const)
              ),
              { type: 'Partner', id: 'LIST' },
            ]
          : [{ type: 'Partner', id: 'LIST' }],
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetPartnerByIdQuery,
  useCreatePartnerDataMutation,
  useUpdatePartnerDataMutation,
  useDeletePartnerDataMutation,
  useGetAllPartnersDataQuery,
  useGetAllPartnerDataQuery,
} = partnerApi
