import { CountyDataProps } from '@lib/types'
import { editorApiSlice } from 'app/api/apiSlice'
import { AxiosError } from 'axios'
import { setCounties, setCounty, setDistrict, setError } from './editorSlice'

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
          if (error instanceof AxiosError) {
            dispatch(setError({ message: error.message }))
          }
          dispatch(setError({ message: 'Unable to get County object' }))
        }
      },
    }),
    getCounties: builder.query({
      query: () => ({
        url: 'editor/county',
      }),
      providesTags: (result, error, arg) => [
        ...result?.map((county: Partial<CountyDataProps>) => ({
          type: 'Editor',
          id: county.id,
        })),
      ],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          dispatch(setCounties(result.data))
        } catch (error) {
          if (error instanceof AxiosError) {
            dispatch(setError({ message: error.message }))
          }
          dispatch(setError({ message: 'Unable to get County objects' }))
        }
      },
    }),
    createDistrict: builder.mutation({
      query: (data) => ({
        url: 'editor/district',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
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
          if (error instanceof AxiosError) {
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
    updateOrCreateDistrictWhyInvestIn: builder.mutation({
      query: (data) => ({
        url: `editor/why-invest`,
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateEconomicData: builder.mutation({
      query: (data) => ({
        url: `editor/economic-data`,
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateDistrictBusinessParks: builder.mutation({
      query: (data) => ({
        url: `editor/business-parks`,
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateDistrictCouncilGrants: builder.mutation({
      query: (data) => ({
        url: `editor/council-grants`,
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateDistrictCouncilServices: builder.mutation({
      query: (data) => ({
        url: `editor/council-services`,
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateDistrictLocalNews: builder.mutation({
      query: (data) => ({
        url: `editor/council-services`,
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
  }),
})

export const {
  useCreateCountyMutation,
  useGetCountiesQuery,
  useGetCountyByIdQuery,
  useUpdateCountyMutation,
  useCreateDistrictMutation,
  useGetDistrictByIdQuery,
  useUpdateOrCreateDistrictWhyInvestInMutation,
  useUpdateDistrictByIdMutation,
  useUpdateOrCreateEconomicDataMutation,
  useUpdateOrCreateDistrictBusinessParksMutation,
  useUpdateOrCreateDistrictCouncilGrantsMutation,
  useUpdateOrCreateDistrictCouncilServicesMutation,
  useUpdateOrCreateDistrictLocalNewsMutation,
} = editorApi
