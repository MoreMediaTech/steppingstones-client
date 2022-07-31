import { CountyDataProps, DistrictDataProps, SectionProps } from '@lib/types'
import { editorApiSlice } from 'app/api/apiSlice'
import { setCounties, setCounty, setDistrict, setError, setSection, setSubSection, setSubSubSection, setEconomicData, setDistrictSection } from './editorSlice'

const editorApi = editorApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCounty: builder.mutation({
      query: (data) => ({
        url: 'editor/county',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    updateCounty: builder.mutation({
      query: (data) => ({
        url: `editor/county/${data.id}`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    getCountyById: builder.query({
      query: (id: string) => ({
        url: `editor/county/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: 'Editor', id: arg }],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCounty(data))
        } catch (error) {
          if (error instanceof Error) {
            dispatch(setError({ message: error.message }))
          }
          dispatch(setError({ message: 'Unable to get County object' }))
        }
      },
    }),
    getCounties: builder.query<CountyDataProps[], void>({
      query: () => ({
        url: 'editor/county',
      }),

      providesTags: (result) =>
        result
          ? [
              ...result?.map(
                (county) =>
                  ({
                    type: 'Editor',
                    id: county?.id,
                  } as const)
              ),
              { type: 'Editor', id: 'LIST' },
            ]
          : [{ type: 'Editor', id: 'LIST' }],
    }),
    removeCounty: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `editor/county/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags:  [{ type: 'Editor', id: 'LIST' }],
    }),
    createDistrict: builder.mutation({
      query: (data) => ({
        url: 'editor/district',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    getDistricts: builder.query<DistrictDataProps[], void>({
      query: () => ({
        url: 'editor/district',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result?.map(
                (district) =>
                  ({
                    type: 'Editor',
                    id: district?.id,
                  } as const)
              ),
              { type: 'Editor', id: 'LIST' },
            ]
          : [{ type: 'Editor', id: 'LIST' }],
    }),
    getDistrictById: builder.query({
      query: (id) => ({
        url: `editor/district/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: 'Editor', id: arg }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          dispatch(setDistrict(result.data))
        } catch (error) {
          if (error instanceof Error) {
            dispatch(setError({ message: error.message }))
          }
          dispatch(setError({ message: 'Unable to get County objects' }))
        }
      },
    }),
    updateDistrictById: builder.mutation({
      query: (data) => ({
        url: `editor/district/${data.id}`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    deleteDistrictById: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `editor/district/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags:  [{ type: 'Editor', id: 'LIST' }],
    }),
    createSection: builder.mutation({
      query: (data) => ({
        url: 'editor/section',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    getSections: builder.query<SectionProps[], void>({
      query: () => ({
        url: 'editor/section',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result?.map(
                (section) =>
                  ({
                    type: 'Editor',
                    id: section?.id,
                  } as const)
              ),
              { type: 'Editor', id: 'LIST' },
            ]
          : [{ type: 'Editor', id: 'LIST' }],
    }),
    updateSectionById: builder.mutation({
      query: (data) => ({
        url: `editor/section/${data.id}`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    getSectionById: builder.query({
      query: (id: string) => ({
        url: `editor/section/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: 'Editor', id: arg }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          dispatch(setSection(result.data))
        } catch (error) {
          if (error instanceof Error) {
            dispatch(setError({ message: error.message }))
          }
          dispatch(setError({ message: 'Unable to get County objects' }))
        }
      },
    }),
    deleteSectionById: builder.mutation({
      query: (id: string) => ({
        url: `editor/section/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    createSubSection: builder.mutation({
      query: (data) => ({
        url: 'editor/subsection',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    updateSubSectionById: builder.mutation({
      query: (data) => ({
        url: `editor/subsection/${data.id}`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    getSubSectionById: builder.query({
      query: (id: string) => ({
        url: `editor/subsection/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: 'Editor', id: arg }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          dispatch(setSubSection(result.data))
        } catch (error) {
          if (error instanceof Error) {
            dispatch(setError({ message: error.message }))
          }
          dispatch(setError({ message: 'Unable to get County objects' }))
        }
      },
    }),
    deleteSubSectionById: builder.mutation({
      query: (id: string) => ({
        url: `editor/subsection/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    createSubSubSection: builder.mutation({
      query: (data) => ({
        url: 'editor/sub-subsection',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    updateSubSubSectionById: builder.mutation({
      query: (data) => ({
        url: `editor/sub-subsection/${data.id}`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    getSubSubSectionById: builder.query({
      query: (id: string) => ({
        url: `editor/sub-subsection/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: 'Editor', id: arg }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          dispatch(setSubSubSection(result.data))
        } catch (error) {
          if (error instanceof Error) {
            dispatch(setError({ message: error.message }))
          }
          dispatch(setError({ message: 'Unable to get County objects' }))
        }
      },
    }),
    deleteSubSubSectionById: builder.mutation({
      query: (id: string) => ({
        url: `editor/sub-subsection/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    createDistrictSection: builder.mutation({
      query: (data) => ({
        url: 'editor/district-section',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    updateDistrictSectionById: builder.mutation({
      query: (data) => ({
        url: `editor/district-section/${data.id}`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    getDistrictSectionById: builder.query({
      query: (id: string) => ({
        url: `editor/district-section/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: 'Editor', id: arg }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          dispatch(setDistrictSection(result.data))
        } catch (error) {
          if (error instanceof Error) {
            dispatch(setError({ message: error.message }))
          }
          dispatch(setError({ message: 'Unable to get County objects' }))
        }
      },
    }),
    deleteDistrictSectionById: builder.mutation({
      query: (id: string) => ({
        url: `editor/district-section/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    createEconomicDataWidget: builder.mutation({
      query: (data) => ({
        url: 'editor/economic-data',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    updateEconomicDataWidgetById: builder.mutation({
      query: (data) => ({
        url: `editor/economic-data/${data.id}`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    getEconomicDataWidgets: builder.mutation({
      query: (id: string) => ({
        url: 'editor/economic-data',
        method: 'POST',
      }),
    }),
    getEconomicDataWidgetById: builder.query({
      query: (id: string) => ({
        url: `editor/economic-data/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: 'Editor', id: arg }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          dispatch(setEconomicData(result.data))
        } catch (error) {
          if (error instanceof Error) {
            dispatch(setError({ message: error.message }))
          }
          dispatch(setError({ message: 'Unable to get County objects' }))
        }
      },
    }),
    deleteEconomicDataWidgetById: builder.mutation({
      query: (id: string) => ({
        url: `editor/economic-data/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    updateOrCreateCountyWelcome: builder.mutation({
      query: (data) => ({
        url: `editor/county-welcome`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateCountyNews: builder.mutation({
      query: (data) => ({
        url: `editor/county-news`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateCountyLEP: builder.mutation({
      query: (data) => ({
        url: `editor/county-lep`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
  }),
  overrideExisting: true,
})

export const {
  useCreateCountyMutation,
  useGetCountiesQuery,
  useGetCountyByIdQuery,
  useUpdateCountyMutation,
  useRemoveCountyMutation,
  useCreateDistrictMutation,
  useGetDistrictsQuery,
  useGetDistrictByIdQuery,
  useUpdateDistrictByIdMutation,
  useDeleteDistrictByIdMutation,
  useUpdateOrCreateCountyWelcomeMutation,
  useUpdateOrCreateCountyNewsMutation,
  useUpdateOrCreateCountyLEPMutation,
  useCreateSectionMutation,
  useGetSectionsQuery,
  useGetSectionByIdQuery,
  useUpdateSectionByIdMutation,
  useDeleteSectionByIdMutation,
  useCreateSubSectionMutation,
  useGetSubSectionByIdQuery,
  useUpdateSubSectionByIdMutation,
  useDeleteSubSectionByIdMutation,
  useCreateSubSubSectionMutation,
  useGetSubSubSectionByIdQuery,
  useUpdateSubSubSectionByIdMutation,
  useDeleteSubSubSectionByIdMutation,
  useCreateDistrictSectionMutation,
  useGetDistrictSectionByIdQuery,
  useUpdateDistrictSectionByIdMutation,
  useDeleteDistrictSectionByIdMutation,
  useCreateEconomicDataWidgetMutation,
  useGetEconomicDataWidgetByIdQuery,
  useUpdateEconomicDataWidgetByIdMutation,
  useDeleteEconomicDataWidgetByIdMutation,
} = editorApi
