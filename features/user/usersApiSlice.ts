import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { apiSlice } from 'state/api/apiSlice'
import { setCredentials, setError } from 'features/auth/authSlice'
import { CurrentUser } from '@lib/types'

export const usersAdapter = createEntityAdapter<CurrentUser>({})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<CurrentUser, void>({
      query: () => ({
        url: '/users/getMe',
        validateStatus: (response: any, result: any) => {
          return response.status === 200 && !result.isError
        },
      }),
      providesTags: (result, error, arg) => [{ type: 'User', id: result?.id }],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          dispatch(
            setCredentials({
              token: JSON.parse(localStorage.getItem('token') as string),
            })
          )
        } catch (error) {
          dispatch(setError({ message: error.message }))
        }
      },
    }),
    getUsers: builder.query<CurrentUser[], void>({
      query: () => ({
        url: '/users',
        validateStatus: (response: any, result: any) => {
          return response.status === 200 && !result.isError
        },
      }),
      providesTags: (result, error, arg) =>
        result
          ? result.map((user) => ({ type: 'User', id: user.id }))
          : [{ type: 'User', id: 'LIST' }],
    }),
    getUserById: builder.query<CurrentUser, string>({
      query: (id) => ({
        url: `/users/${id}`,
        validateStatus: (response: any, result: any) => {
          return response.status === 200 && !result.isError
        },
      }),
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
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: result?.id },
      ],
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

// returns the query result for the current user
export const selectUserResult = usersApiSlice.endpoints.getUser.select()

// creates memoized selector for the current user
const selectUserData = createSelector(selectUserResult, (result) => result.data)

//getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//     selectAll: selectAllUsers,
//     selectById: selectUserById,
//     selectIds: selectUserIds
//     // Pass in a selector that returns the users slice of state
// } = usersAdapter.getSelectors(state => selectUserData(state) ?? initialState)
