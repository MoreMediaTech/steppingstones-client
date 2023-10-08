import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../../store'
import { Error } from '@lib/types'
import { UserSchemaWithIdType } from '@models/User'

const token =
  typeof window !== "undefined" ? localStorage.getItem("_ssapp:token") : null;

export type UserState = {
    message: string
    user: UserSchemaWithIdType | null
    isAuthenticated: boolean
    error: Error
}

export const initialState: UserState = {
  message: '',
  user: null,
  isAuthenticated: token ? true : false,
  error: { message: '' },
}

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      { payload }: PayloadAction<UserSchemaWithIdType | null>
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
