import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppThunk, RootState, AppDispatch } from 'app/store'
import {
  Error,
  IPartnerState,
  PartnerDataProps,
} from '@lib/types'
import { partnerService } from './partnerService'


export const initialState: IPartnerState = {
  isLoading: false,
  isSuccess: false,
  partnerData: [],
  isError: false,
  message: '',
  error: { message: 'An Error occurred' },
}

export const createPartnerData = createAsyncThunk<string, PartnerDataProps, {dispatch: AppDispatch, rejectValue: Error}>(
  'partner/create',
  async (
    data: PartnerDataProps,
    thunkAPI
  ) => {
    try {
      const rootState = thunkAPI.getState() as RootState
      const token = rootState.auth.token ?? ''
      return await partnerService.createPartnerData(data, token)
    } catch (error) {
      const message: AxiosError<Error> =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const updatePartnerData = createAsyncThunk<
  string,
  PartnerDataProps,
  { dispatch: AppDispatch; rejectValue: Error }
>('partner/update', async (data: PartnerDataProps, thunkAPI) => {
  try {
    const rootState = thunkAPI.getState() as RootState
    const token = rootState.auth.token ?? ''
    return await partnerService.updatePartnerData(data, token)
  } catch (error) {
    const message: AxiosError<Error> =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
});

export const deletePartnerData = createAsyncThunk<
  string,
  string,
  { dispatch: AppDispatch; rejectValue: Error }
>('partner/delete', async (id: string, thunkAPI) => {
  try {
    const rootState = thunkAPI.getState() as RootState
    const token = rootState.auth.token ?? ''
    return await partnerService.deletePartnerData(id, token)
  } catch (error) {
    const message: AxiosError<Error> =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
// export const getPartnerDataById = createAsyncThunk<
//   PartnerDataProps,
//   string,
//   { dispatch: AppDispatch; rejectValue: Error }
// >('partner/getDataById', async (id: string, thunkAPI) => {
//   try {
//     const rootState = thunkAPI.getState() as RootState
//     const token = rootState.auth.token ?? ''
//     return await partnerService.getPartnerDataById(id, token)
//   } catch (error) {
//     const message: AxiosError<Error> =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString()
//     return thunkAPI.rejectWithValue(message)
//   }
// })
// export const getAllPartnerData = createAsyncThunk<
//   PartnerDataProps[],
//   void,
//   { dispatch: AppDispatch; rejectValue: Error }
// >('partner/getAllData', async (_, thunkAPI) => {
//   try {
//     const rootState = thunkAPI.getState() as RootState
//     const token = rootState.auth.token ?? ''
//     return await partnerService.getAllPartnerData(token)
//   } catch (error) {
//     const message: AxiosError<Error> =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString()
//     return thunkAPI.rejectWithValue(message)
//   }
// })

// Promise<string | RejectValue<Error, unknown>>

export const partnersSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    // ...other reducers
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    },
    setSuccess: (state, { payload }: PayloadAction<PartnerDataProps>) => {
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
      .addCase(createPartnerData.pending, (state, action) => {
        state.isLoading = true
        state.isError = false
        state.message = ''
      })
      .addCase(
        createPartnerData.fulfilled,
        (state, { payload }) => {
          state.isLoading = false
          state.isError = false
          state.isSuccess = true
          state.message = payload
        }
      )
      .addCase(createPartnerData.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.error = payload
      })
      .addCase(updatePartnerData.pending, (state, action) => {
        state.isLoading = true
        state.isError = false
        state.message = ''
      })
      .addCase(
        updatePartnerData.fulfilled,
        (state, { payload }) => {
          state.isLoading = false
          state.isError = false
          state.isSuccess = true
          state.message = payload
        }
      )
      .addCase(updatePartnerData.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.error = payload
      })
      .addCase(deletePartnerData.pending, (state, action) => {
        state.isLoading = true
        state.isError = false
        state.message = ''
      })
      .addCase(
        deletePartnerData.fulfilled,
        (state, { payload }) => {
          state.isLoading = false
          state.isError = false
          state.isSuccess = true
          state.message = payload
        }
      )
      .addCase(deletePartnerData.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.error = payload
      })
  },
})

export const { setLoading, setSuccess, reset } = partnersSlice.actions
export const partnerSelector = (state: RootState) => state.partner

export default partnersSlice.reducer
