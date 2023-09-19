import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { apiSlice } from 'app/global-state/api/apiSlice'
import {
  UserSchemaWithIdType,
} from '@models/User'

export const usersAdapter = createEntityAdapter<UserSchemaWithIdType>({})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserSchemaWithIdType, void>({
      query: () => ({
        url: '/users/getMe',
        validateStatus: (response: any, result: any) => {
          return response.status === 200 && !result.isError
        },
      }),
      providesTags: (result, error, arg) => [{ type: 'User', id: result?.id }],
    }),
    getUsers: builder.query<UserSchemaWithIdType[], void>({
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
    getUserById: builder.query<UserSchemaWithIdType, string>({
      query: (id) => ({
        url: `/users/${id}`,
        validateStatus: (response: any, result: any) => {
          return response.status === 200 && !result.isError
        },
      }),
      providesTags: (result, error, arg) => [{ type: 'User', id: result?.id }],
    }),
    createUser: builder.mutation<
      { success: boolean; message: string },
      UserSchemaWithIdType
    >({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: { ...user },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User' }],
    }),
    updateUser: builder.mutation<
      { success: boolean; message: string },
      Partial<UserSchemaWithIdType>
    >({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: 'PUT',
        body: { ...user },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User'},
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
