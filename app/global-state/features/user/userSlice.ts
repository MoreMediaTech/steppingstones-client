import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { Error } from "@lib/types";
import { UserSchemaWithIdType } from "@models/User";

export type UserState = {
  message: string;
  user: UserSchemaWithIdType | null;
  isAuthenticated: boolean;
  error: Error;
};

export const initialState: UserState = {
  message: "",
  user: null,
  isAuthenticated: false,
  error: { message: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSession: (
      state,
      {
        payload,
      }: PayloadAction<{
        currentUser: UserSchemaWithIdType;
        isAuthenticated: boolean;
      } | null>,
    ) => {
      state.user = payload?.currentUser || null;
      state.isAuthenticated = payload?.isAuthenticated as boolean;
    },
    resetUser: (state) => {
      state.user = null;
      state.message = "";
    },
    setError: (state, { payload }: PayloadAction<Error>) => {
      state.error = payload;
    },
  },
});

export const { setSession, resetUser, setError } = userSlice.actions;

export const userSelector = (state: RootState) => state.user as UserState;

export default userSlice.reducer;
