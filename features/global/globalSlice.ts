import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { AppThunk, RootState, AppDispatch } from 'state/store'

type GlobalState = {
    loading: boolean
    error: Error
    drawerOpened: boolean
}

const initialState: GlobalState = {
    loading: false,
    error: { name: '', message: 'An Error occurred' },
    drawerOpened: false,
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setLoading: (state, { payload }: PayloadAction<boolean>) => {},
        setError: (state, { payload }: PayloadAction<Error>) => {},
        setDrawerOpened: (state, { payload }: PayloadAction<boolean>) => {
            state.drawerOpened = payload
        },
    },
});

export const { setLoading, setError, setDrawerOpened } = globalSlice.actions
export const globalSelector = (state: RootState) => state.global

export default globalSlice.reducer