import { resetCredentials, setCredentials, setError } from 'features/auth/authSlice';
import { apiSlice, editorApiSlice } from "app/api/apiSlice";
import { CurrentUser } from '@lib/types';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password, token }) => ({
        url: 'auth/login',
        method: 'POST',
        body: { email, password, token },
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
        } catch (error) {}
      },
    }),
    registerPartner: builder.mutation({
      query: (data) => ({
        url: 'auth/register',
        method: 'POST',
        body: { ...data },
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
    verifyEmail: builder.mutation<{success: boolean, message: string}, Partial<CurrentUser>>({
      query: (data) => ({
        url: 'auth/verify-email',
        method: 'POST',
        body: { ...data },
      }),
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
          console.log(error)
          dispatch(setError({ message: error.message }))
        }
      },
      invalidatesTags: [{ type: 'Auth', id: 'LIST' }],
    }),
  }),
  overrideExisting: true,
})

export const { useLoginMutation, useRegisterPartnerMutation, useLogoutMutation, useRequestPasswordResetMutation, useResetPasswordMutation, useVerifyEmailMutation } = authApi;