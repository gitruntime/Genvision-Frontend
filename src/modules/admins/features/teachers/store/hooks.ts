import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  educationListAPI,
  addressListAPI,
  teacherCreateAPI,
  teacherListAPI,
  teacherUpdateAPI,
  teacherViewAPI,
  experienceListAPI,
} from "./api";
import { Teacher } from "../types";
import { useDispatch } from "react-redux";

interface FetchDataParams {
  page?: number | string | null;
  size?: number | string | null;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

interface PaginatedTeacherData {
  currentPage: number;
  data: Teacher[]; // Replace 'Teacher' with the actual type of an individual teacher object
  message: string;
  size: number;
  totalCount: number;
  totalPages: number;
}
export const useListTeacher = ({
  page,
  size,
  sortBy,
  sortOrder,
}: FetchDataParams): UseQueryResult<PaginatedTeacherData, Error> => {
  return useQuery({
    queryKey: ["admin", "teachers", page, size, sortBy, sortOrder],
    queryFn: () =>
      teacherListAPI({
        page,
        size,
        sortBy,
        sortOrder,
      }),
  });
};

export const useCreateTeacher = (): UseMutationResult<
  Teacher,
  AxiosError,
  Teacher
> => {
  return useMutation<any, AxiosError, any>({
    mutationFn: teacherCreateAPI,
    retry: false,
  });
};

export const useViewTeacher = (
  id: string | number
): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["admin", "teacher", id],
    queryFn: () => teacherViewAPI(id),
    enabled: !!id, // Only fetch if id is provided
  });
};

export const useUpdateTeacher = (id: number | string | null) => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: (data) => teacherUpdateAPI(id, data),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "teacher", id]);
    },
  });
};

export const useListTAddress = (
  id: number | string
): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["admin", "teacher", "addresses"],
    queryFn: () => addressListAPI(id),
    enabled: !!id,
  });
};

export const useListTExperience = (
  id: number | string
): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["admin", "teacher", id, "experiences"],
    queryFn: () => experienceListAPI(id),
    enabled: !!id,
  });
};

export const useListTEducation = (
  teacherId: number | string
): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["educations"],
    queryFn: () => educationListAPI(teacherId),
  });
};

// export const useViewStudent = (): UseMutationResult<
//   StudentData,
//   AxiosError,
//   number | string
// > => {
//   return useMutation<StudentData, AxiosError, number | string>({
//     mutationFn: studentViewAPI,
//     onSuccess: (data) => {
//       // handle success
//     },
//     onError: (error) => {
//       // handle error
//     },
//   });
// };

// export const useUpdateStudent = (): UseMutationResult<
//   StudentData,
//   AxiosError,
//   StudentData
// > => {
//   return useMutation<StudentData, AxiosError, StudentData>({
//     mutationFn: studentUpdateAPI,
//     onSuccess: (data) => {
//       // handle success
//     },
//     onError: (error) => {
//       // handle error
//     },
//   });
// };

// export const useDeleteStudent = (): UseMutationResult<
//   void,
//   AxiosError,
//   number | string
// > => {
//   return useMutation<void, AxiosError, number | string>({
//     mutationFn: studentDeleteAPI,
//     onSuccess: (data) => {
//       // handle success
//     },
//     onError: (error) => {
//       // handle error
//     },
//   });
// };
