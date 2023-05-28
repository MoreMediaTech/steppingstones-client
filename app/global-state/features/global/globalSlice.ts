import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

import { AppThunk, RootState, AppDispatch } from 'app/global-state/store'

type GlobalState = {
  loading: boolean
  error: Error
  drawerOpened: boolean
  isVisible: boolean
}

const checkCookieConsent = () => {
  const cookie = Cookies.get('ssapp-cookie-consent')
  if (!cookie || cookie === undefined) {
    return true
  }
  return false
}

const initialState: GlobalState = {
  loading: false,
  error: { name: '', message: 'An Error occurred' },
  drawerOpened: false,
  isVisible: checkCookieConsent(),
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {},
    setError: (state, { payload }: PayloadAction<Error>) => {},
    setDrawerOpened: (state, { payload }: PayloadAction<boolean>) => {
      state.drawerOpened = payload
    },
    setIsVisible: (state, { payload }: PayloadAction<boolean>) => {
      state.isVisible = payload
    },
  },
})

export const { setLoading, setError, setDrawerOpened, setIsVisible } =
  globalSlice.actions
export const globalSelector = (state: RootState) => state.global

export default globalSlice.reducer
