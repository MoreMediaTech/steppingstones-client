import { setupListeners } from "@reduxjs/toolkit/query";
import {
  Action,
  AnyAction,
  configureStore,
  ThunkAction,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";

import authReducer from "app/global-state/features/auth/authSlice";
import partnerReducer from "app/global-state/features/partner/partnerSlice";
import messagesReducer from "app/global-state/features/messages/messagesSlice";
import editorReducer from "@app/global-state/features/content/contentSlice";
import uploadReducer from "app/global-state/features/upload/uploadSlice";
import globalReducer from "app/global-state/features/global/globalSlice";
import userReducer from "app/global-state/features/user/userSlice";
import {
  apiSlice,
  messagesApiSlice,
  partnerApiSlice,
  editorApiSlice,
  uploadApiSlice,
  analyticsApiSlice,
  notificationsApiSlice,
  advertsApiSlice,
} from "./api/apiSlice";

const reducers = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  [messagesApiSlice.reducerPath]: messagesApiSlice.reducer,
  [partnerApiSlice.reducerPath]: partnerApiSlice.reducer,
  [editorApiSlice.reducerPath]: editorApiSlice.reducer,
  [uploadApiSlice.reducerPath]: uploadApiSlice.reducer,
  [analyticsApiSlice.reducerPath]: analyticsApiSlice.reducer,
  [notificationsApiSlice.reducerPath]: notificationsApiSlice.reducer,
  [advertsApiSlice.reducerPath]: advertsApiSlice.reducer,
  auth: authReducer,
  partner: partnerReducer,
  messages: messagesReducer,
  editor: editorReducer,
  upload: uploadReducer,
  global: globalReducer,
  user: userReducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer<any, AnyAction> = (
  state,
  action: AnyAction,
) => {
  return combinedReducer(state, action);
};

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
      notificationsApiSlice.middleware,
      advertsApiSlice.middleware,
    ]),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

const makeStore = () => store;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
