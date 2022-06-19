import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { RootState } from 'app/store'
import { Error } from '@lib/types'

export const initialState = {
  counties: [],
  district: {},
  county: {},
  message: '',
  error: { message: 'An Error occurred' },
}

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setCounties: (state, { payload }: PayloadAction<[]>) => {
      state.counties = payload
    },
    setCounty: (state, { payload }: PayloadAction<{}>) => {
      state.county = payload
    },
    setDistrict: (state, { payload }: PayloadAction<[]>) => {
      state.district = payload
    },
    setError: (state, { payload }: PayloadAction<AxiosError | Error>) => {
      state.error = payload
    },
    clearState: (state) => {
      state.counties = []
      state.district = {}
    },
  },
})

export const { setCounties, setCounty, setDistrict, setError, clearState } =
  editorSlice.actions
export const editorSelector = (state: RootState) => state.editor
export default editorSlice.reducer
