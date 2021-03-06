import { apiSlice } from 'app/api/apiSlice'
import { setCredentials, setError } from 'features/auth/authSlice'
import { CurrentUser } from '@lib/types'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<CurrentUser, void>({
      query: () => '/users/getMe',
      providesTags: (result, error, arg) => [{ type: 'User', id: result?.id }],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          dispatch(
            setCredentials({
              currentUser: result.data,
              token: JSON.parse(localStorage.getItem('token') as string),
            })
          )
        } catch (error) {
          dispatch(setError({ message: error.message }))
        }
      },
    }),
    getUsers: builder.query<CurrentUser[], void>({
      query: () => '/users',
      providesTags: (result, error, arg) =>
        result
          ? result.map((user) => ({ type: 'User', id: user.id }))
          : [{ type: 'User', id: 'LIST' }],
    }),
    getUserById: builder.query<CurrentUser, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, arg) => [{ type: 'User', id: result?.id }],
    }),
    createUser: builder.mutation<CurrentUser, CurrentUser>({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: { ...user },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: result?.id },
      ],
    }),
    updateUser: builder.mutation<CurrentUser, CurrentUser>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: 'PUT',
        body: { ...user },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: result?.id },
      ],
    }),
    resetCredentials: builder.mutation<CurrentUser, CurrentUser>({
      query: (user) => ({
        url: `/resetCredentials/${user.id}`,
        method: 'PUT',
        body: { ...user },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: result?.id }],
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useResetCredentialsMutation,
} = usersApiSlice
