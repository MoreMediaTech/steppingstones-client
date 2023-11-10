import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { RootState } from 'app/global-state/store'

type GlobalState = {
  loading: boolean
  error: Error;
  openModal: boolean
  displayCookieConsent: boolean
  drawerOpened: boolean
  mobileDrawerOpened: boolean
  isVisible: boolean
  isEdit: boolean
}

const checkIsVisible = () => {
  const isVisible = Cookies.get('ssapp-cookie-consent') === 'true'
  return isVisible
}

const checkCookieConsent = () => {
  const cookieConsent = Cookies.get("ssapp-strictly-necessary-cookie-consent");
  if (cookieConsent === "true") {
    Cookies.set("ssapp-cookie-consent", "true");
    return true;
  }

}

const isVisible = checkIsVisible()
const cookieConsent = checkCookieConsent()




const initialState: GlobalState = {
  loading: false,
  openModal: false,
  displayCookieConsent: cookieConsent as boolean,
  error: { name: '', message: 'An Error occurred' },
  drawerOpened: false,
  mobileDrawerOpened: false,
  isVisible: isVisible as boolean,
  isEdit: false,
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload
    },
    setError: (state, { payload }: PayloadAction<Error>) => {
      state.error = payload
    },
    setDrawerOpened: (state, { payload }: PayloadAction<boolean>) => {
      state.drawerOpened = payload
    },
    setMobileDrawerOpened: (state, { payload }: PayloadAction<boolean>) => {
      state.mobileDrawerOpened = payload
    },
    setIsVisible: (state, { payload }: PayloadAction<boolean>) => {
      state.isVisible = payload
    },
    setDisplayCookieConsent: (state, { payload }: PayloadAction<boolean>) => {
      state.displayCookieConsent = payload
    },
    setIsEdit: (state, { payload }: PayloadAction<boolean>) => {
      state.isEdit = payload
    },
    setOpenModal: (state, { payload }: PayloadAction<boolean>) => {
      state.openModal = payload
    },
  },
})

export const { setLoading, setError, setDrawerOpened, setMobileDrawerOpened, setDisplayCookieConsent, setIsVisible, setOpenModal, setIsEdit } =
  globalSlice.actions
export const globalSelector = (state: RootState) => state.global

export default globalSlice.reducer
