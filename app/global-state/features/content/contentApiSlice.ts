import { contentApiSlice } from "@global-state/api/apiSlice";

import { ContentFormProps } from "@models/ContentForm";
import { PartialFeedContentSchema } from "@models/FeedContent";

import {
  PartialLocalFeedContentSchemaProps,
  PartialEconomicDataSchemaProps,
} from "@models/LocalFeedContent";
import { PartialSourceDirectoryProps } from "@models/SourceDirectory";
import { PartialSectionSchemaProps } from "@models/Section";
import { PartialFormSchemaProps } from "@app/(admin)/admin-portal/admin/content-setting/feed-content/use-feed-content-setting-controller";

const contentApi = contentApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFeedContent: builder.mutation<
      { success: boolean; message: string },
      PartialFormSchemaProps
    >({
      query: (data) => ({
        url: "/content/feed-content",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Content"],
    }),
    updateFeedContent: builder.mutation<
      { success: boolean; message: string },
      PartialFeedContentSchema
    >({
      query: (data) => ({
        url: `/content/feed-content/${data.id}`,
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Content", id: arg.id },
      ],
    }),
    getFeedContentById: builder.query<PartialFeedContentSchema, string>({
      query: (id: string) => ({
        url: `/content/feed-content/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: "Content", id: arg }],
    }),
    getFeedContent: builder.query<PartialFeedContentSchema[], void>({
      query: () => ({
        url: "/content/feed-content",
      }),

      providesTags: (result) =>
        result
          ? [
              ...result?.map(
                (county) =>
                  ({
                    type: "Content",
                    id: county?.id,
                  }) as const,
              ),
              { type: "Content", id: "LIST" },
            ]
          : [{ type: "Content", id: "LIST" }],
    }),
    removeFeedContent: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id: string) => ({
        url: `/content/feed-content/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Content", id: "LIST" }],
    }),
    removeManyFeedContent: builder.mutation<
      { success: boolean; message: string },
      string[]
    >({
      query: (ids: string[]) => ({
        url: `/content/feed-content`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: [{ type: "Content", id: "LIST" }],
    }),
    createLocalFeedContent: builder.mutation<
      { success: boolean; message: string },
      PartialLocalFeedContentSchemaProps
    >({
      query: (data) => ({
        url: "/content/local-feed",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: [{ type: "Content", id: "LIST" }],
    }),
    getLocalFeed: builder.query<PartialLocalFeedContentSchemaProps[], void>({
      query: () => ({
        url: "/content/local-feed",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result?.map(
                (district) =>
                  ({
                    type: "Content",
                    id: district?.id,
                  }) as const,
              ),
              { type: "Content", id: "LIST" },
            ]
          : [{ type: "Content", id: "LIST" }],
    }),
    getLocalFeedContentById: builder.query<
      PartialLocalFeedContentSchemaProps,
      string
    >({
      query: (id) => ({
        url: `/content/local-feed/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: "Content", id: arg }],
    }),
    updateLocalFeedContentById: builder.mutation<
      { success: boolean; message: string },
      PartialLocalFeedContentSchemaProps
    >({
      query: (data) => ({
        url: `/content/local-feed/${data.id}`,
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Content", id: arg.id },
      ],
    }),
    deleteLocalFeedContentById: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id: string) => ({
        url: `/content/local-feed/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Content", id: "LIST" }],
    }),
    deleteManyLocalFeedContent: builder.mutation<
      { success: boolean; message: string },
      string[]
    >({
      query: (ids: string[]) => ({
        url: `/content/local-feed`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: [{ type: "Content", id: "LIST" }],
    }),
    createSection: builder.mutation<
      { success: boolean; message: string },
      PartialSectionSchemaProps
    >({
      query: (data) => ({
        url: "/content/section",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: [{ type: "Content", id: "LIST" }],
    }),
    getSections: builder.query<PartialSectionSchemaProps[], void>({
      query: () => ({
        url: "/content/section",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result?.map(
                (section) =>
                  ({
                    type: "Content",
                    id: section?.id,
                  }) as const,
              ),
              { type: "Content", id: "LIST" },
            ]
          : [{ type: "Content", id: "LIST" }],
    }),
    updateSectionById: builder.mutation<
      { success: boolean; message: string },
      Partial<ContentFormProps> & { id: string }
    >({
      query: (data) => ({
        url: `/content/section/${data.id}`,
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Content", id: arg.id },
      ],
    }),
    getSectionById: builder.query<PartialSectionSchemaProps, string>({
      query: (id: string) => ({
        url: `/content/section/${id}`,
        validateStatus: (response: any, result: any) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: (result, error, arg) => [{ type: "Content", id: arg }],
    }),
    getSectionByParentId: builder.query<PartialSectionSchemaProps[], string>({
      query: (parentId: string) => ({
        url: `/content/sections/${parentId}`,
        validateStatus: (response: any, result: any) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: (result, error, arg) => [{ type: "Content", id: arg }],
    }),
    getSectionByFeedContentId: builder.query<
      PartialSectionSchemaProps[],
      string
    >({
      query: (feedContentId: string) => ({
        url: `/content/section/${feedContentId}`,
        validateStatus: (response: any, result: any) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: (result, error, arg) => [{ type: "Content", id: arg }],
    }),
    getSectionByLocalFeedContentId: builder.query<
      PartialSectionSchemaProps,
      string
    >({
      query: (localFeedContentId: string) => ({
        url: `/content/section/${localFeedContentId}`,
        validateStatus: (response: any, result: any) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: (result, error, arg) => [{ type: "Content", id: arg }],
    }),
    deleteSectionById: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id: string) => ({
        url: `/content/section/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Content", id: "LIST" }],
    }),
    deleteManySections: builder.mutation<
      { success: boolean; message: string },
      string[]
    >({
      query: (ids: string[]) => ({
        url: `/content/delete-sections`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: [{ type: "Content", id: "LIST" }],
    }),
    createEconomicDataWidget: builder.mutation<
      { success: boolean; message: string },
      PartialEconomicDataSchemaProps
    >({
      query: (data) => ({
        url: "/content/economic-data",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: [{ type: "Content", id: "LIST" }],
    }),
    updateEconomicDataWidgetById: builder.mutation<
      { success: boolean; message: string },
      PartialEconomicDataSchemaProps
    >({
      query: (data) => ({
        url: `/content/economic-data/${data.id}`,
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Content", id: arg.id },
      ],
    }),
    getEconomicDataWidgets: builder.query<
      PartialEconomicDataSchemaProps[],
      string
    >({
      query: (id: string) => ({
        url: `/content/get-ed-widgets/${id}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result?.map(
                (item) =>
                  ({
                    type: "Content",
                    id: item?.id,
                  }) as const,
              ),
              { type: "Content", id: "LIST" },
            ]
          : [{ type: "Content", id: "LIST" }],
    }),
    getEconomicDataWidgetById: builder.query<
      PartialEconomicDataSchemaProps,
      string
    >({
      query: (id: string) => ({
        url: `/content/economic-data/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: "Content", id: arg }],
    }),
    deleteEconomicDataWidgetById: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id: string) => ({
        url: `/content/economic-data/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Content", id: "LIST" }],
    }),
    deleteManyEconomicDataWidgets: builder.mutation<
      { success: boolean; message: string },
      string[]
    >({
      query: (ids: string[]) => ({
        url: `/content/delete-ed-widgets`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: [{ type: "Content", id: "LIST" }],
    }),
    createSDData: builder.mutation<
      { success: boolean; message: boolean },
      PartialSourceDirectoryProps
    >({
      query: (data) => ({
        url: `/content/source-directory`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: [{ type: "Content", id: "LIST" }],
    }),
    getAllSDDataByType: builder.query<PartialSourceDirectoryProps[], string>({
      query: (type) => ({
        url: `/content/source-directory/${type}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result?.map(
                (item) =>
                  ({
                    type: "Content",
                    id: item?.id,
                  }) as const,
              ),
              { type: "Content", id: "LIST" },
            ]
          : [{ type: "Content", id: "LIST" }],
    }),
    updateSDData: builder.mutation<
      { success: boolean; message: boolean },
      PartialSourceDirectoryProps
    >({
      query: (data) => ({
        url: `/content/source-directory/${data.type}`,
        method: "PATCH",
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Content", id: arg.id },
      ],
    }),
    deleteSDData: builder.mutation<
      { success: boolean; message: boolean },
      PartialSourceDirectoryProps
    >({
      query: (data) => ({
        url: `/content/source-directory/${data.type}`,
        method: "DELETE",
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Content", id: "LIST" },
      ],
    }),
    deleteManySDData: builder.mutation<
      { success: boolean; message: boolean },
      PartialSourceDirectoryProps
    >({
      query: (data) => ({
        url: `/content/delete-source-directories/${data.type}`,
        method: "DELETE",
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Content", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateFeedContentMutation,
  useUpdateFeedContentMutation,
  useGetFeedContentByIdQuery,
  useGetFeedContentQuery,
  useRemoveFeedContentMutation,
  useRemoveManyFeedContentMutation,
  useCreateLocalFeedContentMutation,
  useGetLocalFeedQuery,
  useGetLocalFeedContentByIdQuery,
  useUpdateLocalFeedContentByIdMutation,
  useDeleteLocalFeedContentByIdMutation,
  useDeleteManyLocalFeedContentMutation,
  useCreateSectionMutation,
  useGetSectionsQuery,
  useGetSectionByIdQuery,
  useGetSectionByParentIdQuery,
  useGetSectionByFeedContentIdQuery,
  useGetSectionByLocalFeedContentIdQuery,
  useUpdateSectionByIdMutation,
  useDeleteSectionByIdMutation,
  useDeleteManySectionsMutation,
  useCreateEconomicDataWidgetMutation,
  useGetEconomicDataWidgetsQuery,
  useGetEconomicDataWidgetByIdQuery,
  useUpdateEconomicDataWidgetByIdMutation,
  useDeleteEconomicDataWidgetByIdMutation,
  useDeleteManyEconomicDataWidgetsMutation,
  useGetAllSDDataByTypeQuery,
  useCreateSDDataMutation,
  useUpdateSDDataMutation,
  useDeleteSDDataMutation,
  useDeleteManySDDataMutation,
} = contentApi;
