import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import authReducer from 'features/auth/authSlice'
import partnerReducer from 'features/partner/partnerSlice'
import emailReducer from 'features/email/emailSlice'

// const saveAuthToken = (store) => (next) => (action) => {
//   if (action.type === 'auth/login') {
//     // after a successful login, update the token in the API
//     api.setToken(action.payload.authToken)
//   }

//   // continue processing this action
//   return next(action)
// }
export const store = configureStore({
  reducer: {
    auth: authReducer,
    partner: partnerReducer,
    email: emailReducer,  
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>
