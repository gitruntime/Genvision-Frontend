import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  fullName: string;
  id: number;
  userRole: string;
  isActive: boolean;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  fullName: "",
  id: 0,
  userRole: "",
  isActive: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<AuthState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearUserData: () => initialState, // Optionally clear state on logout
  },
});

export const { setUserData, clearUserData } = authSlice.actions;
export default authSlice.reducer;
