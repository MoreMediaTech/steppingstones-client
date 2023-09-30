import { analyticsApiSlice } from 'app/global-state/api/apiSlice'

const apiSlice = analyticsApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAnalytics: build.query<any, void>({
      query: () => '/analytics/',
      providesTags: [{ type: 'Analytics', id: 'LIST' }],
    }),
  }),
  overrideExisting: true,
})

export const { useGetAnalyticsQuery } = apiSlice
