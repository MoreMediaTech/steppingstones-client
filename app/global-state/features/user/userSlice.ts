import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../../store'
import { Error, AuthState,  } from '@lib/types'
import { HYDRATE } from 'next-redux-wrapper'
import { UserSchemaWithIdAndOrganisationType } from '@models/User'

const token =
  typeof window !== 'undefined' ? localStorage.getItem('token') : null

export type UserState = {
    message: string
    user: UserSchemaWithIdAndOrganisationType | null
    error: Error
}

export const initialState: UserState = {
  message: '',
  user: null,
  error: { message: '' },
}

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      { payload }: PayloadAction<UserSchemaWithIdAndOrganisationType | null>
    ) => {
      state.user = payload
    },
    resetUser: (state) => {
      state.user = null
      state.message = ''
    },
    setError: (state, { payload }: PayloadAction<Error>) => {
      state.error = payload
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload) {
        state = action.payload
      }
    },
  },
})

export const { setUser, resetUser, setError } = userSlice.actions

export const userSelector = (state: RootState) => state.user

export default userSlice.reducer
