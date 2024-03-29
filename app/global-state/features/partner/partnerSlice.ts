import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'app/global-state/store'
import {type  IPartnerState,type PartnerData } from '@lib/types'

export const initialState: IPartnerState = {
  partnersData: [],
  partnerData: null,
  message: '',
  type: '',
  error: { message: 'An Error occurred' },
}

export const partnersSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    setPartnersData: (state, action: PayloadAction<PartnerData[]>) => {
      state.partnersData = action.payload
    },
    setPartnerData: (state, action: PayloadAction<PartnerData | null>) => {
      state.partnerData = action.payload
    },
    setType: (state, action: PayloadAction<'Create' | 'Update'>) => {
      state.type = action.payload
    },
  },
})

export const { setPartnerData, setPartnersData, setType } =
  partnersSlice.actions
export const partnerSelector = (state: RootState) => state.partner

export default partnersSlice.reducer
