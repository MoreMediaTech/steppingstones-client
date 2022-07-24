import { AppDispatch } from './../../app/store'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

import { AppThunk, RootState } from '../../app/store'
import { Error, AuthState, CurrentUser } from '@lib/types'
import { HYDRATE } from 'next-redux-wrapper'

const token =
  typeof window !== 'undefined' ? localStorage.getItem('token') : null

export const initialState: AuthState = {
  currentUser: null,
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
      {
        payload: { currentUser, token },
      }: PayloadAction<{ currentUser: Partial<CurrentUser>; token: string }>
    ) => {
      state.currentUser = currentUser
      state.token = token
    },
    resetCredentials: (state) => {
      state.currentUser = null
      state.token = null
      state.message = ''
    },
    setError: (state, { payload }: PayloadAction<Error>) => {
      state.error = payload
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload) {
        state = action.payload
      }
    }
  }
})

export const { setCredentials, resetCredentials, setError } = authSlice.actions

export const authSelector = (state: RootState) => state.auth

export default authSlice.reducer
