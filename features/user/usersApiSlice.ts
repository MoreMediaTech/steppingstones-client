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
  }),
  overrideExisting: true,
})

export const { useGetUserQuery } = usersApiSlice
