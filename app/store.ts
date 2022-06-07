import { setupListeners } from '@reduxjs/toolkit/dist/query'
import {
  Action,
  configureStore,
  ThunkAction,
  combineReducers,
  Reducer,
} from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import authReducer from 'features/auth/authSlice'
import partnerReducer from 'features/partner/partnerSlice'
import emailReducer from 'features/email/emailSlice'
import { apiSlice, emailApiSlice, partnerApiSlice } from './api/apiSlice'

const reducers = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  [emailApiSlice.reducerPath]: emailApiSlice.reducer,
  [partnerApiSlice.reducerPath]: partnerApiSlice.reducer,
  auth: authReducer,
  partner: partnerReducer,
  email: emailReducer,
}

const combinedReducer = combineReducers<typeof reducers>(reducers)

export const rootReducer: Reducer<RootState> = (state, action) => {
  if (action.type === 'auth/logout') {
    state = {} as RootState
  }

  return combinedReducer(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      apiSlice.middleware,
      emailApiSlice.middleware,
      partnerApiSlice.middleware,
    ]),
  devTools: process.env.NODE_ENV !== 'production',
})

setupListeners(store.dispatch)

const makeStore = () => store
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof combinedReducer>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>

export const wrapper = createWrapper<AppStore>(makeStore)
