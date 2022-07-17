import { setupListeners } from '@reduxjs/toolkit/dist/query'
import {
  Action,
  AnyAction,
  configureStore,
  ThunkAction,
  combineReducers,
  Reducer,
} from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import authReducer from 'features/auth/authSlice'
import partnerReducer from 'features/partner/partnerSlice'
import emailReducer from 'features/email/emailSlice'
import editorReducer from 'features/editor/editorSlice'
import uploadReducer from 'features/upload/uploadSlice'
import {
  apiSlice,
  emailApiSlice,
  partnerApiSlice,
  editorApiSlice,
  uploadApiSlice,
} from './api/apiSlice'

const reducers = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  [emailApiSlice.reducerPath]: emailApiSlice.reducer,
  [partnerApiSlice.reducerPath]: partnerApiSlice.reducer,
  [editorApiSlice.reducerPath]: editorApiSlice.reducer,
  [uploadApiSlice.reducerPath]: uploadApiSlice.reducer,
  auth: authReducer,
  partner: partnerReducer,
  email: emailReducer,
  editor: editorReducer,
  upload: uploadReducer,
}

const combinedReducer = combineReducers<typeof reducers>(reducers)

export const rootReducer: Reducer<RootState> = (
  state,
  action: AnyAction
) => {
 if (action.type === HYDRATE) {
   const nextState = {
     ...state, // use previous state
     ...action.payload, // apply delta from hydration
   }
   return nextState
 } else {
   return combinedReducer(state, action)
 }
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      apiSlice.middleware,
      emailApiSlice.middleware,
      partnerApiSlice.middleware,
      editorApiSlice.middleware,
      uploadApiSlice.middleware,
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
