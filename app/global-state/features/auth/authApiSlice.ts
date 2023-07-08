import {
  resetCredentials,
  setCredentials,
  setError,
} from 'app/global-state/features/auth/authSlice'
import { apiSlice, editorApiSlice } from 'app/global-state/api/apiSlice'
import * as z from 'zod'
import { UserSchemaWithIdAndOrganisationType } from '@models/User'

export const authSchema = z.object({
  token: z.string().nonempty(),
  email: z.string().email().nonempty(),
  oneTimeCode: z.string().nonempty().optional(),
})

export type Auth = z.infer<typeof authSchema>



export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, token }: Auth) => ({
        url: 'auth/login',
        method: 'POST',
        body: { email, token },
      }),
      invalidatesTags: [{ type: 'Auth', id: 'LIST' }],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
        } catch (error) {
          console.log(error)
          dispatch(setError({ message: error.message }))
        }
      },
    }),
    authenticate: builder.mutation({
      query: ({ email, token, oneTimeCode }: Auth) => ({
        url: 'auth/authenticate',
        method: 'POST',
        body: { email, token, oneTimeCode },
      }),
      invalidatesTags: [{ type: 'Auth', id: 'LIST' }],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            setCredentials({
              token: data.token,
            })
          )
        } catch (error) {
          console.log(error)
          dispatch(setError({ message: error.message }))
        }
      },
    }),
    registerPartner: builder.mutation({
      query: (data) => ({
        url: 'auth/register',
        method: 'POST',
        body: { ...data },
        validateStatus: (response: any, result: any) => {
          return response.status === 200 && !result.isError
        },
      }),
      invalidatesTags: [{ type: 'Auth', id: 'LIST' }],
    }),
    requestPasswordReset: builder.mutation({
      query: ({ email }) => ({
        url: 'auth/request-reset',
        method: 'POST',
        body: { email },
      }),
      invalidatesTags: [{ type: 'Auth', id: 'LIST' }],
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: 'auth/reset',
        method: 'POST',
        body: { token, password },
      }),
      invalidatesTags: [{ type: 'Auth', id: 'LIST' }],
    }),
    verifyEmail: builder.mutation<
      { success: boolean; message: string },
      Partial<UserSchemaWithIdAndOrganisationType>
    >({
      query: (data) => ({
        url: 'auth/verify-email',
        method: 'POST',
        body: { ...data },
      }),
    }),
    refresh: builder.mutation<{ token: string }, void>({
      query: () => ({
        url: 'auth/refresh',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          const { token } = data
          dispatch(setCredentials({ token }))
        } catch (err) {
          console.log(err)
          dispatch(setError({ message: err.message }))
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(resetCredentials())
          dispatch(apiSlice.util.resetApiState())
          dispatch(editorApiSlice.util.resetApiState())
        } catch (error) {
          console.error(error)
          dispatch(setError({ message: error.message }))
        }
      },
      invalidatesTags: [{ type: 'Auth', id: 'LIST' }],
    }),
  }),
  overrideExisting: true,
})

export const {
  useLoginMutation,
  useAuthenticateMutation,
  useRegisterPartnerMutation,
  useLogoutMutation,
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
  useRefreshMutation,
  useVerifyEmailMutation,
} = authApi
