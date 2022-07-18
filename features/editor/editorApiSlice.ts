import { CountyDataProps } from '@lib/types'
import { editorApiSlice } from 'app/api/apiSlice'
import { AxiosError } from 'axios'
import { setCounties, setCounty, setDistrict, setError, setSection, setSubSection, setSubSubSection } from './editorSlice'

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
    createSection: builder.mutation({
      query: (data) => ({
        url: 'editor/section',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Editor', id: 'LIST' }],
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
    updateOrCreateDistrictWhyInvestIn: builder.mutation({
      query: (data) => ({
        url: `editor/why-invest`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateEconomicData: builder.mutation({
      query: (data) => ({
        url: `editor/economic-data`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateDistrictBusinessParks: builder.mutation({
      query: (data) => ({
        url: `editor/business-parks`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateDistrictCouncilGrants: builder.mutation({
      query: (data) => ({
        url: `editor/council-grants`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateDistrictCouncilServices: builder.mutation({
      query: (data) => ({
        url: `editor/council-services`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateDistrictLocalNews: builder.mutation({
      query: (data) => ({
        url: `editor/local-news`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateFeatureArticle: builder.mutation({
      query: (data) => ({
        url: `editor/feature-article`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateOnlineDigitilisation: builder.mutation({
      query: (data) => ({
        url: `editor/online-digitilisation`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateCommercialProperty: builder.mutation({
      query: (data) => ({
        url: `editor/commercial-property`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateVatAndTax: builder.mutation({
      query: (data) => ({
        url: `editor/vat-and-tax`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateDevelopProductsAndServices: builder.mutation({
      query: (data) => ({
        url: `editor/develop-products-and-services`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateEmployPeople: builder.mutation({
      query: (data) => ({
        url: `editor/employ-people`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
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
    updateOrCreateSocialEnterprises: builder.mutation({
      query: (data) => ({
        url: `editor/social-enterprises`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateLGBTQAndDisabilities: builder.mutation({
      query: (data) => ({
        url: `editor/lgbtq-and-disabilities`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateMHW: builder.mutation({
      query: (data) => ({
        url: `editor/mhw`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateHeritageAndTourism: builder.mutation({
      query: (data) => ({
        url: `editor/heritage-and-tourism`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateCNZT: builder.mutation({
      query: (data) => ({
        url: `editor/cznt`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateMarketResearch: builder.mutation({
      query: (data) => ({
        url: `editor/market-research`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateLegalChecklist: builder.mutation({
      query: (data) => ({
        url: `editor/legal-checklist`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateFindStartupFunding: builder.mutation({
      query: (data) => ({
        url: `editor/find-startup-funding`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateBusinessPlan: builder.mutation({
      query: (data) => ({
        url: `editor/business-plan`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateBusinessInsurance: builder.mutation({
      query: (data) => ({
        url: `editor/business-insurance`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateBGB: builder.mutation({
      query: (data) => ({
        url: `editor/bgb`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateTradingOverseas: builder.mutation({
      query: (data) => ({
        url: `editor/trading-overseas`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateOME: builder.mutation({
      query: (data) => ({
        url: `editor/operate-more-efficiently`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateImproveSkills: builder.mutation({
      query: (data) => ({
        url: `editor/improve-skills`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateFindTAndC: builder.mutation({
      query: (data) => ({
        url: `editor/find-tandc`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),
    updateOrCreateFindNewMarkets: builder.mutation({
      query: (data) => ({
        url: `editor/find-new-markets`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Editor', id: arg.id }],
    }),

    updateOrCreateFindFunding: builder.mutation({
      query: (data) => ({
        url: `editor/find-funding`,
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
  useCreateDistrictMutation,
  useGetDistrictByIdQuery,
  useUpdateOrCreateDistrictWhyInvestInMutation,
  useUpdateDistrictByIdMutation,
  useUpdateOrCreateEconomicDataMutation,
  useUpdateOrCreateDistrictBusinessParksMutation,
  useUpdateOrCreateDistrictCouncilGrantsMutation,
  useUpdateOrCreateDistrictCouncilServicesMutation,
  useUpdateOrCreateDistrictLocalNewsMutation,
  useUpdateOrCreateFeatureArticleMutation,
  useUpdateOrCreateOnlineDigitilisationMutation,
  useUpdateOrCreateCommercialPropertyMutation,
  useUpdateOrCreateVatAndTaxMutation,
  useUpdateOrCreateDevelopProductsAndServicesMutation,
  useUpdateOrCreateEmployPeopleMutation,
  useUpdateOrCreateFindNewMarketsMutation,
  useUpdateOrCreateCountyWelcomeMutation,
  useUpdateOrCreateCountyNewsMutation,
  useUpdateOrCreateCountyLEPMutation,
  useUpdateOrCreateSocialEnterprisesMutation,
  useUpdateOrCreateLGBTQAndDisabilitiesMutation,
  useUpdateOrCreateMHWMutation,
  useUpdateOrCreateHeritageAndTourismMutation,
  useUpdateOrCreateCNZTMutation,
  useUpdateOrCreateMarketResearchMutation,
  useUpdateOrCreateLegalChecklistMutation,
  useUpdateOrCreateFindStartupFundingMutation,
  useUpdateOrCreateBusinessPlanMutation,
  useUpdateOrCreateBusinessInsuranceMutation,
  useUpdateOrCreateBGBMutation,
  useUpdateOrCreateTradingOverseasMutation,
  useUpdateOrCreateOMEMutation,
  useUpdateOrCreateImproveSkillsMutation,
  useUpdateOrCreateFindTAndCMutation,
  useUpdateOrCreateFindFundingMutation,
  useCreateSectionMutation,
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
} = editorApi
