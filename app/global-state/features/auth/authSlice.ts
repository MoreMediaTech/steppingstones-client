import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { Error, AuthState } from "@lib/types";

export const initialState: AuthState = {
  message: "",
  isAuthenticated: false,
  error: { message: "" },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (
      state,
      {
        payload: { isAuthenticated },
      }: PayloadAction<{ isAuthenticated: boolean }>,
    ) => {
      state.isAuthenticated = isAuthenticated;
    },
    resetCredentials: (state) => {
      state.message = "";
      state.isAuthenticated = false;
    },
    setError: (state, { payload }: PayloadAction<Error>) => {
      state.error = payload;
    },
  },
});

export const { setAuthState, resetCredentials, setError } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth as AuthState;

export default authSlice.reducer;
