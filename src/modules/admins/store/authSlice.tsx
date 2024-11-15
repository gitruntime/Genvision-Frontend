// store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  fullName: string;
  id: number;
  userRole: string;
  isActive: boolean;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  fullName: "",
  id: 0,
  userRole: "",
  isActive: false,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserState>) => {
      state.fullName = action.payload.fullName;
      state.id = action.payload.id;
      state.userRole = action.payload.userRole;
      state.isActive = action.payload.isActive;
      state.isAuthenticated = true;
    },
    clearUserData: (state) => {
      state.fullName = "";
      state.id = 0;
      state.userRole = "";
      state.isActive = false;
      state.isAuthenticated = false;
    },
  },
});

export const { setUserData, clearUserData } = authSlice.actions;
export default authSlice.reducer;
