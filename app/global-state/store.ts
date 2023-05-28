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
import authReducer from 'app/global-state/features/auth/authSlice'
import partnerReducer from 'app/global-state/features/partner/partnerSlice'
import messagesReducer from 'app/global-state/features/messages/messagesSlice'
import editorReducer from 'app/global-state/features/editor/editorSlice'
import uploadReducer from 'app/global-state/features/upload/uploadSlice'
import globalReducer from 'app/global-state/features/global/globalSlice'
import {
  apiSlice,
  messagesApiSlice,
  partnerApiSlice,
  editorApiSlice,
  uploadApiSlice,
  analyticsApiSlice,
} from './api/apiSlice'

const reducers = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  [messagesApiSlice.reducerPath]: messagesApiSlice.reducer,
  [partnerApiSlice.reducerPath]: partnerApiSlice.reducer,
  [editorApiSlice.reducerPath]: editorApiSlice.reducer,
  [uploadApiSlice.reducerPath]: uploadApiSlice.reducer,
  [analyticsApiSlice.reducerPath]: analyticsApiSlice.reducer,
  auth: authReducer,
  partner: partnerReducer,
  messages: messagesReducer,
  editor: editorReducer,
  upload: uploadReducer,
  global: globalReducer,
}

const combinedReducer = combineReducers<typeof reducers>(reducers)

export const rootReducer: Reducer<any, AnyAction> = (
  state,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply data from hydration
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
      messagesApiSlice.middleware,
      partnerApiSlice.middleware,
      editorApiSlice.middleware,
      uploadApiSlice.middleware,
      analyticsApiSlice.middleware,
    ]),
  devTools: process.env.NODE_ENV !== 'production',
})

setupListeners(store.dispatch)

const makeStore = () => store
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>

export const wrapper = createWrapper<AppStore>(makeStore)
