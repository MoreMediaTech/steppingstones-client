import { resetCredentials } from 'features/auth/authSlice';
import { apiSlice } from "app/api/apiSlice";
import { usersApiSlice } from "features/user/usersApiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: 'auth/login',
        method: 'POST',
        body: { email, password },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {data} = await queryFulfilled
          await dispatch(usersApiSlice.endpoints.getUser.initiate())
        } catch (error) {}
      },
      invalidatesTags: ['Auth'],
    }),
    registerPartner: builder.mutation({
      query: (data) => ({
        url: 'auth/register',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: ['Auth'],
    }),
    requestPasswordReset: builder.mutation({
      query: ({ email }) => ({
        url: 'auth/request-reset',
        method: 'POST',
        body: { email },
      }),
      invalidatesTags: ['Auth'],
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: 'auth/reset',
        method: 'POST',
        body: { token, password },
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
          dispatch(usersApiSlice.util.resetApiState())
        } catch (error) {}
      },
      invalidatesTags: ['Auth', 'User'],
    }),
    
  }),
  overrideExisting: true,
})

export const { useLoginMutation, useRegisterPartnerMutation, useLogoutMutation, useRequestPasswordResetMutation, useResetPasswordMutation } = authApi;