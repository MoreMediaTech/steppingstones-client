import { createSlice,type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'app/global-state/store'
import type { MessageTypes } from '@models/Messages'


export interface EmailState {
  enquiries: MessageTypes[]
  enquiry: MessageTypes | null
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
      }: PayloadAction<{ enquiry: MessageTypes | null; reply: boolean }>
    ) => {
      state.enquiry = payload.enquiry
      state.reply = payload.reply
    },
  },
})

export const { setReply } = messagesSlice.actions
export const messagesSelector = (state: RootState) => state.messages
export default messagesSlice.reducer
