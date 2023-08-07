import {
  CountyDataProps,
  DistrictDataProps,
  DistrictSectionProps,
  EconomicDataWidgetProps,
  SectionProps,
  SourceDataProps,
  SourceDirectoryDataProps,
  SubSectionProps,
  SubSubSectionProps,
} from '@lib/types'
import { editorApiSlice } from 'app/global-state/api/apiSlice'
import {
  setCounty,
  setDistrict,
  setError,
  setSubSubSection,
  setEconomicData,
  setDistrictSection,
} from './editorSlice'
import { ContentFormProps } from '@models/ContentForm';
import { CountySchemaProps } from '@models/County';

const editorApi = editorApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCounty: builder.mutation<
      { success: boolean; message: string },
      CountyDataProps
    >({
      query: (data) => ({
        url: 'editor/county',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    updateCounty: builder.mutation<
      { success: boolean; message: string },
      Partial<CountyDataProps>
    >({
      query: (data) => ({
        url: `editor/county/${data.id}`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    getCountyById: builder.query<CountyDataProps, string>({
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
    removeCounty: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id: string) => ({
        url: `editor/county/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    removeManyCounties: builder.mutation<
      { success: boolean; message: string },
      string[]
    >({
      query: (ids: string[]) => ({
        url: `editor/delete-counties`,
        method: 'DELETE',
        body: { ids },
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    createDistrict: builder.mutation<
      { success: boolean; message: string },
      DistrictDataProps
    >({
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
    getDistrictById: builder.query<DistrictDataProps, string>({
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
    updateDistrictById: builder.mutation<
      { success: boolean; message: string },
      DistrictDataProps
    >({
      query: (data) => ({
        url: `editor/district/${data.id}`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    deleteDistrictById: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id: string) => ({
        url: `editor/district/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    deleteManyDistricts: builder.mutation<
      { success: boolean; message: string },
      string[]
    >({
      query: (ids: string[]) => ({
        url: `editor/delete-districts`,
        method: 'DELETE',
        body: { ids },
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    createSection: builder.mutation<
      { success: boolean; message: string },
      ContentFormProps
    >({
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
    updateSectionById: builder.mutation<
      { success: boolean; message: string },
      ContentFormProps & { id: string }
    >({
      query: (data) => ({
        url: `editor/section/${data.id}`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    getSectionById: builder.query<SectionProps, string>({
      query: (id: string) => ({
        url: `editor/section/${id}`,
        validateStatus: (response: any, result: any) => {
          return response.status === 200 && !result.isError
        },
      }),
      providesTags: (result, error, arg) => [{ type: 'Editor', id: arg }],
    }),
    deleteSectionById: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id: string) => ({
        url: `editor/section/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    deleteManySections: builder.mutation<
      { success: boolean; message: string },
      string[]
    >({
      query: (ids: string[]) => ({
        url: `editor/delete-sections`,
        method: 'DELETE',
        body: { ids },
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    createSubSection: builder.mutation<
      { success: boolean; message: string },
      ContentFormProps
    >({
      query: (data) => ({
        url: 'editor/subsection',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    updateSubSectionById: builder.mutation<
      { success: boolean; message: string },
      ContentFormProps & { id: string }
    >({
      query: (data) => ({
        url: `editor/subsection/${data.id}`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    getSubSectionById: builder.query<SubSectionProps, string>({
      query: (id: string) => ({
        url: `editor/subsection/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: 'Editor', id: arg }],
    }),
    getSubSectionsBySectionId: builder.query<SubSectionProps[], string>({
      query: (sectionId: string) => ({
        url: `editor/sub-subsections/${sectionId}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result?.map(
                (subSection) =>
                  ({
                    type: 'Editor',
                    id: subSection?.id,
                  } as const)
              ),
              { type: 'Editor', id: 'LIST' },
            ]
          : [{ type: 'Editor', id: 'LIST' }],
    }),
    deleteSubSectionById: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id: string) => ({
        url: `editor/subsection/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    deleteManySubSections: builder.mutation<
      { success: boolean; message: string },
      string[]
    >({
      query: (ids: string[]) => ({
        url: `editor/delete-subsections`,
        method: 'DELETE',
        body: { ids },
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    createSubSubSection: builder.mutation<
      { success: boolean; message: string },
      SubSubSectionProps
    >({
      query: (data) => ({
        url: 'editor/sub-subsection',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    updateSubSubSectionById: builder.mutation<
      { success: boolean; message: string },
      ContentFormProps & { id: string }
    >({
      query: (data) => ({
        url: `editor/sub-subsection/${data.id}`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    getSubSubSectionById: builder.query<SubSubSectionProps, string>({
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
    deleteSubSubSectionById: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id: string) => ({
        url: `editor/sub-subsection/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    deleteManySubSubSections: builder.mutation<
      { success: boolean; message: string },
      string[]
    >({
      query: (ids: string[]) => ({
        url: `editor/delete-sub-subsections`,
        method: 'DELETE',
        body: { ids },
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    createDistrictSection: builder.mutation<
      { success: boolean; message: string },
      { districtId: string; name: string; isEconomicData: boolean }
    >({
      query: (data) => ({
        url: 'editor/district-section',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    updateDistrictSectionById: builder.mutation<
      { success: boolean; message: string },
      ContentFormProps & { id: string }
    >({
      query: (data) => ({
        url: `editor/district-section/${data.id}`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    getDistrictSectionById: builder.query<DistrictSectionProps, string>({
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
    getDistrictSectionsByDistrictId: builder.query<
      DistrictSectionProps[],
      string
    >({
      query: (districtId: string) => ({
        url: `editor/district-sections/${districtId}`,
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
    deleteDistrictSectionById: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id: string) => ({
        url: `editor/district-section/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    deleteManyDistrictSections: builder.mutation<
      { success: boolean; message: string },
      string[]
    >({
      query: (ids: string[]) => ({
        url: `editor/delete-district-sections`,
        method: 'DELETE',
        body: { ids },
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    createEconomicDataWidget: builder.mutation<
      { success: boolean; message: string },
      EconomicDataWidgetProps
    >({
      query: (data) => ({
        url: 'editor/economic-data',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    updateEconomicDataWidgetById: builder.mutation<
      { success: boolean; message: string },
      EconomicDataWidgetProps
    >({
      query: (data) => ({
        url: `editor/economic-data/${data.id}`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    getEconomicDataWidgets: builder.query<EconomicDataWidgetProps[], void>({
      query: () => ({
        url: 'editor/economic-data',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result?.map(
                (item) =>
                  ({
                    type: 'Editor',
                    id: item?.id,
                  } as const)
              ),
              { type: 'Editor', id: 'LIST' },
            ]
          : [{ type: 'Editor', id: 'LIST' }],
    }),
    getEconomicDataWidgetById: builder.query<EconomicDataWidgetProps, string>({
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
    deleteEconomicDataWidgetById: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id: string) => ({
        url: `editor/economic-data/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    deleteManyEconomicDataWidgets: builder.mutation<
      { success: boolean; message: string },
      string[]
    >({
      query: (ids: string[]) => ({
        url: `editor/delete-ed-widgets`,
        method: 'DELETE',
        body: { ids },
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
    createSDData: builder.mutation<
      { success: boolean; message: boolean },
      SourceDataProps
    >({
      query: (data) => ({
        url: `editor/source-directory`,
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
    }),
    getAllSDDataByType: builder.query<SourceDataProps[], string>({
      query: (type) => ({
        url: `editor/source-directory/${type}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result?.map(
                (item) =>
                  ({
                    type: 'Editor',
                    id: item?.id,
                  } as const)
              ),
              { type: 'Editor', id: 'LIST' },
            ]
          : [{ type: 'Editor', id: 'LIST' }],
    }),
    updateSDData: builder.mutation<
      { success: boolean; message: boolean },
      SourceDirectoryDataProps
    >({
      query: (data) => ({
        url: `editor/source-directory/${data.type}`,
        method: 'PATCH',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    deleteSDData: builder.mutation<
      { success: boolean; message: boolean },
      Partial<SourceDirectoryDataProps>
    >({
      query: (data) => ({
        url: `editor/source-directory/${data.type}`,
        method: 'DELETE',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: 'LIST' }],
    }),
    deleteManySDData: builder.mutation<
      { success: boolean; message: boolean },
      Partial<SourceDirectoryDataProps>
    >({
      query: (data) => ({
        url: `editor/delete-source-directories/${data.type}`,
        method: 'DELETE',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: 'LIST' }],
    }),
    getPublicFeed: builder.query<{ counties: Pick<CountySchemaProps, 'id' | 'name' | 'imageUrl' | 'logoIcon'>[] }, void>({
      query: () => ({
        url: `feed`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.counties?.map(
                (item) =>
                  ({
                    type: 'Editor',
                    id: item?.id,
                  } as const)
              ),
              { type: 'Editor', id: 'LIST' },
            ]
          : [{ type: 'Editor', id: 'LIST' }],
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
  useRemoveManyCountiesMutation,
  useCreateDistrictMutation,
  useGetDistrictsQuery,
  useGetDistrictByIdQuery,
  useUpdateDistrictByIdMutation,
  useDeleteDistrictByIdMutation,
  useDeleteManyDistrictsMutation,
  useUpdateOrCreateCountyWelcomeMutation,
  useUpdateOrCreateCountyNewsMutation,
  useUpdateOrCreateCountyLEPMutation,
  useCreateSectionMutation,
  useGetSectionsQuery,
  useGetSectionByIdQuery,
  useUpdateSectionByIdMutation,
  useDeleteSectionByIdMutation,
  useDeleteManySectionsMutation,
  useCreateSubSectionMutation,
  useGetSubSectionByIdQuery,
  useGetSubSectionsBySectionIdQuery,
  useUpdateSubSectionByIdMutation,
  useDeleteSubSectionByIdMutation,
  useDeleteManySubSectionsMutation,
  useCreateSubSubSectionMutation,
  useGetSubSubSectionByIdQuery,
  useUpdateSubSubSectionByIdMutation,
  useDeleteSubSubSectionByIdMutation,
  useDeleteManySubSubSectionsMutation,
  useCreateDistrictSectionMutation,
  useGetDistrictSectionByIdQuery,
  useGetDistrictSectionsByDistrictIdQuery,
  useUpdateDistrictSectionByIdMutation,
  useDeleteDistrictSectionByIdMutation,
  useDeleteManyDistrictSectionsMutation,
  useCreateEconomicDataWidgetMutation,
  useGetEconomicDataWidgetByIdQuery,
  useUpdateEconomicDataWidgetByIdMutation,
  useDeleteEconomicDataWidgetByIdMutation,
  useDeleteManyEconomicDataWidgetsMutation,
  useGetAllSDDataByTypeQuery,
  useCreateSDDataMutation,
  useUpdateSDDataMutation,
  useDeleteSDDataMutation,
  useDeleteManySDDataMutation,
  useGetPublicFeedQuery,
} = editorApi
