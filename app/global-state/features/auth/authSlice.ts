import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../../store'
import { Error, AuthState } from '@lib/types'

const token =
  typeof window !== 'undefined' ? localStorage.getItem('_ssapp:token') : null

export const initialState: AuthState = {
  message: '',
  token: token,
  isAuthenticated: token ? true : false,
  error: { message: '' },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (
      state,
      { payload: { token, isAuthenticated } }: PayloadAction<{ token: string; isAuthenticated: boolean }>
    ) => {
      state.token = token
      state.isAuthenticated = isAuthenticated
    },
    resetCredentials: (state) => {
      state.token = null
      state.message = ''
      state.isAuthenticated = false
    },
    setError: (state, { payload }: PayloadAction<Error>) => {
      state.error = payload
    },
  },
})

export const { setAuthState, resetCredentials, setError } = authSlice.actions

export const authSelector = (state: RootState) => state.auth

export const selectCurrentToken = (state: RootState) => state.auth.token

export default authSlice.reducer
