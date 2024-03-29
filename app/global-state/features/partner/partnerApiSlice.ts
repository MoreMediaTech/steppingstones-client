import { partnerApiSlice } from '@global-state/api/apiSlice'
import {
  type PartialPartnerProps,
  type PartialPartnerWithOrganisationProps,
} from "@models/Partner";

export const partnerApi = partnerApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPartnerById: builder.query<PartialPartnerWithOrganisationProps, string>({
      query: (id: string) => ({
        url: `/partners/directory/${id}`,
      }),
      providesTags: [{ type: "Partner" }],
    }),
    createPartnerData: builder.mutation<
      { success: boolean; message: string },
      PartialPartnerProps
    >({
      query: (data) => ({
        url: `/partners/directory`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: [{ type: "Partner", id: "List" }],
    }),
    updatePartnerData: builder.mutation<
      { success: boolean; message: string },
      PartialPartnerProps
    >({
      query: (data) => ({
        url: `/partners/directory/${data.id}`,
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Partner", id: arg.id },
      ],
    }),
    deletePartnerData: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id: string) => ({
        url: `/partners/directory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Partner", id: "List" }],
    }),
    deleteManyPartnerData: builder.mutation<
      { success: boolean; message: string },
      string[]
    >({
      query: (ids: string[]) => ({
        url: `/partners/delete-directories`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: [{ type: "Partner", id: "List" }],
    }),
    getAllPartnersData: builder.query<
      PartialPartnerWithOrganisationProps[],
      void
    >({
      query: () => ({
        url: `/partners/directory`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result?.map(
                (partnerData) =>
                  ({
                    type: "Partner" as const,
                    id: partnerData?.id,
                  } as const)
              ),
              { type: "Partner", id: "LIST" },
            ]
          : [{ type: "Partner", id: "LIST" }],
    }),
    getAllPartnerData: builder.query<
      PartialPartnerWithOrganisationProps[],
      string
    >({
      query: (id: string) => ({
        url: `/partners/all/${id}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result?.map(
                (partnerData) =>
                  ({
                    type: "Partner" as const,
                    id: partnerData?.id,
                  } as const)
              ),
              { type: "Partner", id: "LIST" },
            ]
          : [{ type: "Partner", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetPartnerByIdQuery,
  useCreatePartnerDataMutation,
  useUpdatePartnerDataMutation,
  useDeletePartnerDataMutation,
  useGetAllPartnersDataQuery,
  useGetAllPartnerDataQuery,
  useDeleteManyPartnerDataMutation,
} = partnerApi
