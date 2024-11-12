import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  isAuthenticated: boolean;
  token: object | null;
  user: any | null;
  error: string[] | null;
}

// Define the initial state with proper types
const initialState: AuthState = {
  token: localStorage.getItem("tokens")
    ? JSON.parse(localStorage.getItem("tokens")!)
    : null,
  user: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      console.log(action.payload, "payload");
      state.isAuthenticated = true;
      state.token = action.payload;
      state.user = jwtDecode(action.payload.accessToken);
      state.error = null;
      localStorage.setItem("tokens", JSON.stringify(action.payload));
    },
    removeCredentials: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("tokens");
    },
    setCredentialError: (state, action: PayloadAction<string[]>) => {
      state.error = action.payload;
      console.log(state.error, "state.error");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setCredentials,
  removeCredentials,
  setCredentialError,
  clearError,
} = authSlice.actions;
export default authSlice.reducer;
