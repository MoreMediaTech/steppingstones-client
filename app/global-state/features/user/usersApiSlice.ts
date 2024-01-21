import { apiSlice } from 'app/global-state/api/apiSlice'
import {
  UserSchemaWithIdType,
} from '@models/User'
import { isFetchBaseQueryError, isErrorWithMessage } from '@app/global-state/helper'
import { setError } from '@app/global-state/features/global/globalSlice'



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
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          if (data) {
            dispatch(
              usersApiSlice.util.updateQueryData('getUser', undefined, (draft) => {
                Object.assign(draft, data)
              })
            )
          }
        } catch (err) {
          if (isFetchBaseQueryError(err)) {
            console.error(err);
            const errMsg =
              "error" in err ? err.error : JSON.stringify(err.message);
            dispatch(setError({ message: errMsg as string, name: err.name }));
          } else if (isErrorWithMessage(err)){
            dispatch(setError({ message: err.message, name: 'FETCH_ERROR'}));
          };
        }
      },
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


