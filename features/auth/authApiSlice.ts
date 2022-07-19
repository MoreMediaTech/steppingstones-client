import { resetCredentials, setCredentials } from 'features/auth/authSlice';
import { apiSlice } from "app/api/apiSlice";
import { usersApiSlice } from "features/user/usersApiSlice";

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
        await dispatch(usersApiSlice.endpoints.getUser.initiate())
        try {
          const { data } = await queryFulfilled
           dispatch(
             setCredentials({
               currentUser: data.user,
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
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(resetCredentials())
          dispatch(usersApiSlice.util.resetApiState())
        } catch (error) {}
      },
      invalidatesTags: [{ type: 'Auth', id: 'LIST' }],
    }),
  }),
  overrideExisting: true,
})

export const { useLoginMutation, useRegisterPartnerMutation, useLogoutMutation, useRequestPasswordResetMutation, useResetPasswordMutation } = authApi;