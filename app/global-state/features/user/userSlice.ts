import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../../store'
import { Error } from '@lib/types'
import { UserSchemaWithIdAndOrganisationType } from '@models/User'

const token =
  typeof window !== 'undefined' ? localStorage.getItem('token') : null

export type UserState = {
    message: string
    user: UserSchemaWithIdAndOrganisationType | null
    isAuthenticated: boolean
    error: Error
}

export const initialState: UserState = {
  message: '',
  user: null,
  isAuthenticated: false,
  error: { message: '' },
}

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      { payload }: PayloadAction<UserSchemaWithIdAndOrganisationType | null>
    ) => {
      state.user = payload
    },
    resetUser: (state) => {
      state.user = null
      state.message = ''
    },
    setError: (state, { payload }: PayloadAction<Error>) => {
      state.error = payload
    },
  },
})

export const { setUser, resetUser, setError } = userSlice.actions

export const userSelector = (state: RootState) => state.user

export default userSlice.reducer
