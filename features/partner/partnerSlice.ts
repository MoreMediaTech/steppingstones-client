import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { AppThunk, RootState } from 'app/store'
import {
  Error,
  IPartnerState,
  PartnerDataProps,
} from '@lib/types'



export const initialState: IPartnerState = {
  partnerData: [],
  message: '',
  error: { message: 'An Error occurred' },
}


export const partnersSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    // ...other reducers
    setPartnerData: (state, action: PayloadAction<PartnerDataProps[]>) => {
      state.partnerData = action.payload
    }
  },
})

export const { setPartnerData } = partnersSlice.actions
export const partnerSelector = (state: RootState) => state.partner

export default partnersSlice.reducer
