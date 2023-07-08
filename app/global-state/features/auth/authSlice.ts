import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../../store'
import { Error, AuthState } from '@lib/types'
import { HYDRATE } from 'next-redux-wrapper'

const token =
  typeof window !== 'undefined' ? localStorage.getItem('token') : null

export const initialState: AuthState = {
  message: '',
  token: token,
  error: { message: '' },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { token } }: PayloadAction<{ token: string }>
    ) => {
      state.token = token
    },
    resetCredentials: (state) => {
      state.token = null
      state.message = ''
    },
    setError: (state, { payload }: PayloadAction<Error>) => {
      state.error = payload
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload) {
        state = action.payload
      }
    },
  },
})

export const { setCredentials, resetCredentials, setError } = authSlice.actions

export const selectCurrentToken = (state: RootState) => state.auth.token

export default authSlice.reducer
