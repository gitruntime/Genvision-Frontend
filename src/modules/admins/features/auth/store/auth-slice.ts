import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: any | null;
  error: object | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.error = null
    },
    logOut: (state) => {},
    setLoginError: (state) => {}
  },
});

export const { logIn, logOut, setLoginError } = authSlice.actions;
export default authSlice.reducer;
