import { resetCredentials, setAuthState, setError } from "./authSlice";
import { setSession } from "../user/userSlice";
import { apiSlice, contentApiSlice } from "app/global-state/api/apiSlice";
import * as z from "zod";
import { UserSchemaWithIdType } from "@models/User";

export const authSchema = z.object({
  token: z.string(),
  email: z.string().email(),
  oneTimeCode: z.string().optional(),
});

export type Auth = z.infer<typeof authSchema>;

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, token }: Auth) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, token },
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    authenticate: builder.mutation({
      query: ({ email, token, oneTimeCode }: Auth) => ({
        url: "/auth/authenticate",
        method: "POST",
        body: { email, token, oneTimeCode },
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setSession({
              currentUser: data as UserSchemaWithIdType,
              isAuthenticated: true,
            }),
          );
        } catch (error) {
          console.error("authenticate builder mutation: ", error);
          dispatch(setError({ message: error.message }));
        }
      },
    }),
    registerPartner: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...data },
        validateStatus: (response: any, result: any) => {
          return response.status === 200 && !result.isError;
        },
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    requestPasswordReset: builder.mutation({
      query: ({ email }) => ({
        url: "/auth/request-reset",
        method: "POST",
        body: { email },
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: "/auth/reset",
        method: "POST",
        body: { token, password },
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    verifyEmail: builder.mutation<
      { success: boolean; message: string },
      Partial<UserSchemaWithIdType>
    >({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: { ...data },
      }),
    }),
    refresh: builder.mutation<{ token: string }, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { token } = data;
          dispatch(setAuthState({ isAuthenticated: true }));
        } catch (err) {
          console.error("refresh builder mutation: ", err);
          dispatch(setError({ message: err.message }));
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(resetCredentials());
          dispatch(setSession({ currentUser: null, isAuthenticated: false }));
          dispatch(apiSlice.util.resetApiState());
          dispatch(contentApiSlice.util.resetApiState());
        } catch (error) {
          console.error(error);
          dispatch(setError({ message: error.message }));
        }
      },
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useAuthenticateMutation,
  useRegisterPartnerMutation,
  useLogoutMutation,
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
  useRefreshMutation,
  useVerifyEmailMutation,
} = authApi;
