import { IEmailFormData } from './../../lib/types.d';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppThunk, RootState, AppDispatch } from 'app/store'
import { emailService } from './emailService';


export const initialState = {
  isLoading: false,
  isSuccess: false,
  emailMessages: [],
  isError: false,
  message: '',
  error: { message: 'An Error occurred' },
}

const sendEmail = createAsyncThunk<string, IEmailFormData, { dispatch: AppDispatch; rejectValue: Error }>('email/send', async (data: IEmailFormData, thunkAPI) => {
    try {
        return await emailService.sendEmail(data)
    } catch (error) {
       const message: AxiosError<Error> =
         (error.response &&
           error.response.data &&
           error.response.data.message) ||
         error.message ||
         error.toString()
       return thunkAPI.rejectWithValue(message)
        
    }
})

export const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    },
    setSuccess: (state, { payload }) => {
      state.isSuccess = true
      state.isLoading = false
    },
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendEmail.pending, (state, action) => {
        state.isLoading = true
        state.isError = false
        state.message = ''
      })
      .addCase(
        sendEmail.fulfilled,
        (state, { payload }) => {
          state.isLoading = false
          state.isError = false
          state.isSuccess = true
          state.message = payload
        }
      )
      .addCase(sendEmail.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.error = payload as Error
      })
  },
})

export const { setLoading, setSuccess, reset } = emailSlice.actions
export const emailSelector = (state: RootState) => state.email
export default emailSlice.reducer