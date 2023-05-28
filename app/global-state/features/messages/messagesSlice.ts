import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { AppThunk, RootState, AppDispatch } from 'app/global-state/store'
import { IEmailFormData, MessageProps } from '../../../../lib/types'

export interface EmailState {
  enquiries: MessageProps[]
  enquiry: MessageProps | null
  message: string
  reply: boolean
  error: Error
}

export const initialState: EmailState = {
  enquiries: [],
  enquiry: null,
  message: '',
  reply: false,
  error: { name: '', message: 'An Error occurred' },
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setReply: (
      state,
      {
        payload,
      }: PayloadAction<{ enquiry: MessageProps | null; reply: boolean }>
    ) => {
      state.enquiry = payload.enquiry
      state.reply = payload.reply
    },
  },
})

export const { setReply } = messagesSlice.actions
export const messagesSelector = (state: RootState) => state.messages
export default messagesSlice.reducer
