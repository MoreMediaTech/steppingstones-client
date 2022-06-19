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
      invalidatesTags: ['Editor', 'County'],
    }),
    getCountyById: builder.query({
      query: (id) => ({
        url: `editor/county/${id}`,
      }),
      providesTags: ['County'],
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
      providesTags: ['Editor', 'County'],
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
        url: 'editor/county/district',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: ['Editor', 'District'],
    }),
    getDistrictById: builder.query({
      query: (id) => ({
        url: `editor/county/district/${id}`,
      }),
      providesTags: ['Editor', 'District'],
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
    createDistrictWhyInvest: builder.mutation({
        query: (data) => ({
            url: 'editor/county/district/why-invest',
            method: 'POST',
            body: { ...data },
        }),
        invalidatesTags: ['Editor', 'District'],
    }),
    updateDistrictWhyInvest: builder.mutation({
        query: (data) => ({
            url: 'editor/county/district/why-invest',
            method: 'PUT',
            body: { ...data },
        }),
        invalidatesTags: ['Editor', 'District'],
    }),
  }),
})

export const {
  useCreateCountyMutation,
  useGetCountiesQuery,
  useGetCountyByIdQuery,
  useCreateDistrictMutation,
  useGetDistrictByIdQuery,
    useCreateDistrictWhyInvestMutation,
    useUpdateDistrictWhyInvestMutation
} = editorApi
