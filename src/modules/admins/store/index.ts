import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../../authentication/store/auth-slice";
import { teacherReducer } from "../features/teachers/store/slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    teacher: teacherReducer,
  },
});

