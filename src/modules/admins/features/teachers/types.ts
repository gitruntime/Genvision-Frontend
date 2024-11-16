// Define Teacher type
export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  createdAt: string;
}

export interface TeacherDetails {
  fullName: string;
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  teacherProfile: {
    bio: string | null;
    bloodGroup: string | null;
  };
}

// Define State type
export interface TeacherState {
  teacherList: Teacher[];
  currentTeacher: TeacherDetails | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

export interface FetchDataParams {
  page?: number | string | null;
  size?: number | string | null;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}
