import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import authReducer from 'features/auth/authSlice'
import partnerReducer from 'features/partner/partnerSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    partner: partnerReducer,
  },
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>
