import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import {
  setAuthState,
  resetCredentials,
} from 'app/global-state/features/auth/authSlice'
import { RootState } from 'app/global-state/store'

interface RefreshResult {
  error?: FetchBaseQueryError | undefined
  data?:
    | {
        token: string
      }
    | undefined
  meta?: FetchBaseQueryMeta | undefined
}

function checkIsError(obj: unknown): obj is Error {
  return (
    typeof obj === 'object' && obj !== null && 'data' in obj && 'status' in obj
  )
}

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  any,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',     
  prepareHeaders: (headers, api) => {
    const { auth } = api.getState() as RootState
    const token = auth.token

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    headers.set('Content-Type', 'application/json')
    return headers
  },
})

const baseQueryWithReAuth: BaseQueryFn = async (
  args: string | FetchArgs,
  api,
  extraOptions
) => {
  
  let result = await baseQuery(args, api, extraOptions)
  if (result?.error?.status === 400) {
    localStorage.removeItem('_ssapp:token')
    api.dispatch(resetCredentials())
    result = await baseQuery(args, api, extraOptions)
  }
  if (result?.error?.status === 401 || result?.error?.status === 403) {
    // send refresh token to get new token
    const refreshResult: RefreshResult = await baseQuery(
      '/refresh/',
      api,
      extraOptions
    )
    if (refreshResult?.data) {
      // store new token
      localStorage.setItem('_ssapp:token', refreshResult?.data?.token as string)
      api.dispatch(
        setAuthState({ token: refreshResult?.data?.token as string, isAuthenticated: true })
      )
      // retry original request
      result = await baseQuery(args, api, extraOptions)
    } else {
      if (refreshResult?.error?.status === 403) {
        if (checkIsError(refreshResult?.error?.data)) {
          refreshResult.error.data.message =
            'You Session has expired. Please login again. '
        }
      }
    }
  }
  return result
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Auth', 'User'],
  keepUnusedDataFor: 500,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({}),
})

export const partnerApiSlice = createApi({
  reducerPath: 'partnerApi',
  baseQuery: baseQueryWithReAuth,
  keepUnusedDataFor: 960,
  tagTypes: ['Partner'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({}),
})
export const editorApiSlice = createApi({
  reducerPath: 'editorApi',
  baseQuery: baseQueryWithReAuth,
  keepUnusedDataFor: 300,
  tagTypes: ['Editor'],
  refetchOnMountOrArgChange: true,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({}),
})

export const messagesApiSlice = createApi({
  reducerPath: 'messagesApi',
  baseQuery: baseQueryWithReAuth,
  keepUnusedDataFor: 300,
  tagTypes: ['Messages'],
  refetchOnMountOrArgChange: true,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({}),
})

export const uploadApiSlice = createApi({
  reducerPath: 'uploadApi',
  baseQuery: baseQueryWithReAuth,
  keepUnusedDataFor: 300,
  tagTypes: ['Upload'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({}),
})
export const analyticsApiSlice = createApi({
  reducerPath: 'analyticsApi',
  baseQuery: baseQueryWithReAuth,
  keepUnusedDataFor: 300,
  tagTypes: ['Analytics'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({}),
})
