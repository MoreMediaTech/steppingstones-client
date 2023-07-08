import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { RootState } from 'app/global-state/store'

type GlobalState = {
  loading: boolean
  error: Error;
  openModal: boolean
  drawerOpened: boolean
  isVisible: boolean
}

const checkIsVisible = () => {
  const isVisible = Cookies.get('ssapp-cookie-consent') === 'true'
  return isVisible
}

const isVisible = checkIsVisible()
console.log("🚀 ~ file: globalSlice.ts:20 ~ isVisible:", isVisible)


const initialState: GlobalState = {
  loading: false,
  openModal: false,
  error: { name: '', message: 'An Error occurred' },
  drawerOpened: false,
  isVisible: isVisible as boolean,
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
    setOpenModal: (state, { payload }: PayloadAction<boolean>) => {
      state.openModal = payload
    },
  },
})

export const { setLoading, setError, setDrawerOpened, setIsVisible, setOpenModal } =
  globalSlice.actions
export const globalSelector = (state: RootState) => state.global

export default globalSlice.reducer
