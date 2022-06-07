import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react'
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { HYDRATE } from 'next-redux-wrapper'

import { setCredentials, resetCredentials } from 'features/auth/authSlice'
import { CurrentUser } from '@lib/types'
import { API_URL } from '@config/index'
import { RootState } from 'app/store'


interface RefreshResult {
  error?: FetchBaseQueryError | undefined
  data?:{
        token: string
      }
    | undefined
  meta?: FetchBaseQueryMeta | undefined
}

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  any,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: API_URL,
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
  if (result?.error?.status === 401 || result?.error?.status === 403) {
    // send refresh token to get new token
    const refreshResult: RefreshResult = await baseQuery(
      '/refresh/',
      api,
      extraOptions
    )
    if (refreshResult?.data) {
      const { auth } = api.getState() as RootState
      const user = auth.currentUser as CurrentUser
      // store new token
      localStorage.setItem('token', refreshResult?.data?.token as string)
      api.dispatch(
        setCredentials({ token: refreshResult?.data?.token as string, currentUser: user })
      )
      // retry original request
      result = await baseQuery(args, api, extraOptions)
    }
  } else {
    // api.dispatch(resetCredentials())
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Auth', 'User'],
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
  keepUnusedDataFor: 960,
  tagTypes: ['Editor'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({}),
})

export const emailApiSlice = createApi({
  reducerPath: 'emailApi',
  baseQuery: baseQueryWithReAuth,
  keepUnusedDataFor: 960,
  tagTypes: ['Email'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({}),
})