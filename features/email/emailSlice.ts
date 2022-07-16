import { IEmailFormData } from '../../lib/types'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppThunk, RootState, AppDispatch } from 'app/store'

export const initialState = {
  emailMessages: [],
  message: '',
  error: { message: 'An Error occurred' },
}


export const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setEmailMessages: (state, { payload }: PayloadAction<[]>) => {
      state.emailMessages = payload
    },
  },
})

export const { setEmailMessages } = emailSlice.actions
export const emailSelector = (state: RootState) => state.email
export default emailSlice.reducer
