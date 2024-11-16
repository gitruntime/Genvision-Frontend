import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Teacher, TeacherDetails, TeacherState } from "../types";

// Initial state
const initialState: TeacherState = {
  teacherList: [],
  currentTeacher: null,
  loading: false,
  error: null,
  message: null,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setTeacherList: (
      state,
      action: PayloadAction<{ data: Teacher[]; message?: string | null }>
    ) => {
      state.error = null;
      state.message = action.payload.message ?? null;
      state.teacherList = action.payload.data;
    },
    setTeacherDetails: (
      state,
      action: PayloadAction<{ data: TeacherDetails; message: string | null }>
    ) => {
      state.error = null;
      state.message = action.payload.message;
      state.currentTeacher = action.payload.data;
    },
    setTeacherError: (
      state,
      action: PayloadAction<{ error: any; message: string }>
    ) => {
      state.error = action.payload.error;
      state.message = action.payload.message;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});
export const { setTeacherList, setTeacherDetails, setTeacherError } =
  teacherSlice.actions;
export const teacherReducer = teacherSlice.reducer;
