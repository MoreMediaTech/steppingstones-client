import { DistrictDataProps } from '../../lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { RootState } from 'app/store'
import { CountyDataProps, Error } from '@lib/types'

interface IEditorState {
  counties: Partial<CountyDataProps[]>
  district: Partial<DistrictDataProps>
  county: Partial<CountyDataProps>
  message: string
  error: Error | null
}

export const initialState: IEditorState = {
  counties: [],
  district: {
    id: '',
    name: '',
    imageUrl: '',
    logoIcon: '',
  },
  county: {
     id: '',
    name: '',
    imageUrl: '',
    logoIcon: '',
  },
  message: '',
  error: { message: 'An Error occurred' },
}

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setCounties: (state, { payload }: PayloadAction<CountyDataProps[]>) => {
      state.counties = payload
    },
    setCounty: (state, { payload }: PayloadAction<CountyDataProps>) => {
      state.county = payload
    },
    setDistrict: (state, { payload }: PayloadAction<DistrictDataProps>) => {
      state.district = payload
    },
    setError: (state, { payload }: PayloadAction<AxiosError | Error>) => {
      state.error = payload
    },
    clearState: (state) => initialState,
  },
})

export const { setCounties, setCounty, setDistrict, setError, clearState } =
  editorSlice.actions
export const editorSelector = (state: RootState) => state.editor
export default editorSlice.reducer
