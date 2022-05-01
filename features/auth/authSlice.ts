import { AppDispatch } from './../../app/store'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

import { AppThunk, RootState } from '../../app/store'
import authService from './authService'

export interface AuthError {
  message: string 
}

export interface AuthState {
  isAuth: boolean
  currentUser?: CurrentUser | null
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  message: string
  error: AuthError | undefined
}

export interface CurrentUser {
  id?: string
  name?: string
  email?: string
  isAdmin?: boolean
  role?: string
}
export const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  isSuccess: false,
  currentUser: null,
  isError: false,
  message: '',
  error: { message: 'An Error occurred' },
}

// Register user
export const registerUser = createAsyncThunk<
  Partial<CurrentUser>,
  Partial<CurrentUser>,
  { dispatch: AppDispatch, rejectValue: AuthError }
>('auth/register', async (user: Partial<CurrentUser>, thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    },
    setAuthSuccess: (state, { payload }: PayloadAction<CurrentUser>) => {
      state.currentUser = payload
      state.isAuth = true
    },
    setLogOut: (state) => {
      state.isAuth = false
      state.currentUser = undefined
    },
    setAuthFailed: (state, { payload }: PayloadAction<AuthError>) => {
      state.error = payload
      state.isAuth = false
    },
    reset: (state) => {
      state.isAuth = false
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true
      state.isError = false
      state.message = ''
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.isError = false
      state.message = ''
      state.isAuth = true
      state.currentUser = action.payload
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.error = action.payload
      state.currentUser = null
    })
  },
})

export const { setAuthSuccess, setLogOut, setLoading, setAuthFailed, reset } =
  authSlice.actions

export const authSelector = (state: RootState) => state.auth

export default authSlice.reducer
