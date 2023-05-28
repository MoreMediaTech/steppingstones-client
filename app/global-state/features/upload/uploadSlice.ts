import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { RootState } from 'app/global-state/store'
import { Error } from '@lib/types'

type InitialStateProps = {
  imageUrl: string
  previewSource: string | ArrayBuffer | null
  selectedFile: File | null
  message: string
  error: AxiosError | Error
}

export const initialState: InitialStateProps = {
  imageUrl: '',
  previewSource: '',
  selectedFile: null,
  message: '',
  error: { message: 'An Error occurred' },
}

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setImageUrl: (state, { payload }: PayloadAction<string>) => {
      state.imageUrl = payload
    },
    setPreviewSource: (
      state,
      { payload }: PayloadAction<string | ArrayBuffer | null>
    ) => {
      state.previewSource = payload
    },
    setSelectedFile: (state, { payload }: PayloadAction<File>) => {
      state.selectedFile = payload
    },
    clearState: () => initialState,
    setMessage: (state, { payload }: PayloadAction<string>) => {
      state.message = payload
    },
    setError: (state, { payload }: PayloadAction<AxiosError | Error>) => {
      state.error = payload
    },
  },
})

export const {
  setImageUrl,
  setPreviewSource,
  setMessage,
  setSelectedFile,
  setError,
  clearState,
} = uploadSlice.actions
export const uploadSelector = (state: RootState) => state.upload
export default uploadSlice.reducer
