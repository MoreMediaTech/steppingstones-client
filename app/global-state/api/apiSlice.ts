import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";

import { RootState } from "app/global-state/store";

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  any,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  prepareHeaders: (headers, api) => {
    const { auth } = api.getState() as RootState;
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: ["Auth", "User"],
  keepUnusedDataFor: 500,
  endpoints: (builder) => ({}),
});
export const advertsApiSlice = createApi({
  reducerPath: "advertsApi",
  baseQuery: baseQuery,
  keepUnusedDataFor: 300,
  tagTypes: ["Adverts"],
  endpoints: (builder) => ({}),
});

export const partnerApiSlice = createApi({
  reducerPath: "partnerApi",
  baseQuery: baseQuery,
  keepUnusedDataFor: 960,
  tagTypes: ["Partner"],
  endpoints: (builder) => ({}),
});
export const contentApiSlice = createApi({
  reducerPath: "contentApi",
  baseQuery: baseQuery,
  keepUnusedDataFor: 300,
  tagTypes: ["Content"],
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({}),
});

export const messagesApiSlice = createApi({
  reducerPath: "messagesApi",
  baseQuery: baseQuery,
  keepUnusedDataFor: 300,
  tagTypes: ["Messages"],
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({}),
});

export const uploadApiSlice = createApi({
  reducerPath: "uploadApi",
  baseQuery: baseQuery,
  keepUnusedDataFor: 300,
  tagTypes: ["Upload"],
  endpoints: (builder) => ({}),
});
export const analyticsApiSlice = createApi({
  reducerPath: "analyticsApi",
  baseQuery: baseQuery,
  keepUnusedDataFor: 300,
  tagTypes: ["Analytics"],
  endpoints: (builder) => ({}),
});
export const notificationsApiSlice = createApi({
  reducerPath: "notificationsApi",
  baseQuery: baseQuery,
  keepUnusedDataFor: 300,
  tagTypes: ["Notifications"],
  endpoints: (builder) => ({}),
});
