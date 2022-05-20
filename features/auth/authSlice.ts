import { AppDispatch } from './../../app/store'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

import { AppThunk, RootState } from '../../app/store'
import authService from './authService'
import { getUser } from '@lib/getUser'
import { Error, AuthState, CurrentUser } from '@lib/types'
import Cookies from 'js-cookie'

const token =
  typeof window !== 'undefined' && localStorage.getItem('ss_access_token') || ''
const user = typeof window !== 'undefined' && localStorage.getItem('user') || ''

export const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  isSuccess: false,
  currentUser: user ? JSON.parse(user) : null,
  isError: false,
  message: '',
  token: token,
  error: { message: 'An Error occurred' },
}



// Register user
export const registerUser = createAsyncThunk<
  string,
  Partial<CurrentUser>,
  { dispatch: AppDispatch, rejectValue: Error }
>('auth/register', async (user: Partial<CurrentUser>, thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString() || "Registration failed. Please try again."
    return thunkAPI.rejectWithValue(message)
  }
})

// Login user
export const loginUser = createAsyncThunk<
  Partial<AuthState>,
  Partial<CurrentUser>,
  { dispatch: AppDispatch, rejectValue: Error }
>('auth/login', async (user: Partial<CurrentUser>, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString() || "Unable to login. Please check your credentials and try again."
    return thunkAPI.rejectWithValue(message)
  }
})

export const fetchUser = createAsyncThunk('auth/me', async (_, thunkAPI) => {
  try {
    const response = await authService.getUser()
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        return await authService.logout()
    } catch (error) {
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString() || "Logout failed. Please try again."
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
    setAuthSuccess: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: CurrentUser; token: string }>
    ) => {
      state.currentUser = user
      state.token = token
      state.isAuth = true
    },
    setLogOut: (state) => {
      state.isAuth = false
      state.currentUser = undefined
    },
    setAuthFailed: (state, { payload }: PayloadAction<Error>) => {
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
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true
        state.isError = false
        state.message = ''
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.error = action.payload
        state.currentUser = null
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true
        state.isError = false
        state.message = ''
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.message = ''
        state.isAuth = true
        state.token = action.payload.token ?? ''
        state.currentUser = action.payload.currentUser
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.error = action.payload
        state.currentUser = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false
        state.currentUser = null
      })
  },
})

export const { setAuthSuccess, setLogOut, setLoading, setAuthFailed, reset } =
  authSlice.actions

export const authSelector = (state: RootState) => state.auth

export default authSlice.reducer
