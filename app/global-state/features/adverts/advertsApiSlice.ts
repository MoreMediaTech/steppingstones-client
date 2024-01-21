import { advertsApiSlice } from "@app/global-state/api/apiSlice";
import { PartialAdvertSchemaProps } from "@models/Advert";

export const advertsApi = advertsApiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAdverts: build.query<PartialAdvertSchemaProps[], void>({
        query: () => "/adverts",
        providesTags: [{ type: "Adverts", id: "LIST" }],
        }),
        getAdvertsById: build.query<PartialAdvertSchemaProps, string>({
        query: (id) => `/adverts/${id}`,
        providesTags: [{ type: "Adverts", id: "LIST" }],
        }),
        createAdvert: build.mutation<{ success: boolean; message: string; }, PartialAdvertSchemaProps>({
        query: (body) => ({
            url: "/adverts/create",
            method: "POST",
            body: { ...body},
        }),
        invalidatesTags: [{ type: "Adverts", id: "LIST" }],
        }),
        updateAdvert: build.mutation<{ success: boolean; message: string; }, PartialAdvertSchemaProps>({
        query: (body) => ({
            url: `/adverts/${body.id}`,
            method: "PUT",
            body: { ...body},
        }),
        invalidatesTags: [{ type: "Adverts", id: "LIST" }],
        }),
        deleteAdvert: build.mutation<{ success: boolean; message: string; }, string>({
        query: (id) => ({
            url: `/adverts/${id}`,
            method: "DELETE",
        }),
        invalidatesTags: [{ type: "Adverts", id: "LIST" }],
        }),
    }),
    overrideExisting: true,
});

export const { 
    useGetAdvertsQuery,
    useGetAdvertsByIdQuery,
    useCreateAdvertMutation,
    useUpdateAdvertMutation,
    useDeleteAdvertMutation,
  } = advertsApi;