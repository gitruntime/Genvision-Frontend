import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { FetchDataParams } from "../../teachers/types";
import {
  AIPromptAPI,
  attendanceCreateAPI,
  attendanceUpdateAPI,
  InterestListAPI,
  MarkCreateAPI,
  MarkListAPI,
  SAddressListAPI,
  SAttendanceListAPI,
  studentCreateAPI,
  StudentListAPI,
  studentViewAPI,
} from "./api";
import { AxiosError } from "axios";
import { AddStudentsToClassAPI } from "../../classes/store/api";

export const useListStudents = ({
  page = 1,
  size = 100,
  sortBy = "id",
  sortOrder = "ASC",
}: FetchDataParams): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["admin", "students", page, size, sortBy, sortOrder],
    queryFn: () =>
      StudentListAPI({
        page,
        size,
        sortBy,
        sortOrder,
      }),
  });
};

export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: (data) => studentCreateAPI(data),
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["admin", "students"]);
    },
    retry: false,
  });
};

export const useViewStudents = (id:any): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["admin", "class", "student", id],
    queryFn: () => studentViewAPI(id),
    enabled: !!id,
  });
};

export const useSAddressListAPI = (id:any): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["admin", "students", "addresses"],
    queryFn: () => SAddressListAPI(id),
  });
};

export const useSAttendanceListAPI = (id:any): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["admin", "students", "attendances"],
    queryFn: () => SAttendanceListAPI(id),
  });
};

export const useSCreateAttendanceAPI = (id:any) => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: (data) => attendanceCreateAPI(id, data),
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["admin", "students", "attendances"]);
    },
    retry: false,
  });
};

export const useSUpdateAttendanceAPI = (studentId:any) => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: ([id, data]) => attendanceUpdateAPI(studentId, id, data),
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["admin", "students", "attendances"]);
    },
    retry: false,
  });
};

export const useAddStudentsToClass = (id:any) => {
  return useMutation<any, AxiosError, any>({
    mutationFn: (data) => AddStudentsToClassAPI(id, data),
    onSuccess: () => {
      // queryClient.invalidateQueries(["admin", "students", "attendances"]);
    },
    retry: false,
  });
};

export const useSMarkListAPI = (id:any): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["admin", "students", "marks"],
    queryFn: () => MarkListAPI(id),
  });
};

export const useSMarkCreateAPI = (id:any) => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: (data) => MarkCreateAPI(id, data),
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["admin", "students", "marks"]);
    },
    retry: false,
  });
};

export const useSInterestListAPI = (id : any): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["admin", "students", "interests"],
    queryFn: () => InterestListAPI(id),
  });
};

export const useAIPrompt = (id : any): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["admin", "students", "prompts"],
    queryFn: () => AIPromptAPI(id),
    enabled: !!id,
  });
};

// import { useMutation, UseMutationResult } from "@tanstack/react-query";
// import { useDispatch } from "react-redux";
// import {
//   addressCreateAPI,
//   addressDeleteAPI,
//   addressListAPI,
//   addressUpdateAPI,
//   addressViewAPI,
//   studentCreateAPI,
//   studentDeleteAPI,
//   studentListAPI,
//   studentUpdateAPI,
//   studentViewAPI,
// } from "./api";
// import { AxiosError } from "axios";

export const useListStudent = (): UseMutationResult<any, AxiosError> => {
  return useMutation<any, AxiosError>({
    mutationFn: studentListAPI,
    onSuccess: (data) => {
      // handle success
    },
    onError: (error) => {
      // handle error
    },
  });
};

export const useCreateStudent = (): UseMutationResult<
  StudentData,
  AxiosError,
  StudentData
> => {
  const dispatch = useDispatch();
  return useMutation<StudentData, AxiosError, StudentData>({
    mutationFn: studentCreateAPI,
    onSuccess: (data) => {
      // handle success
    },
    onError: (error) => {
      // handle error
    },
    retry: false,
  });
};

export const useViewStudent = (): UseMutationResult<
  StudentData,
  AxiosError,
  number | string
> => {
  return useMutation<StudentData, AxiosError, number | string>({
    mutationFn: studentViewAPI,
    onSuccess: (data) => {
      // handle success
    },
    onError: (error) => {
      // handle error
    },
  });
};

export const useUpdateStudent = (): UseMutationResult<
  StudentData,
  AxiosError,
  StudentData
> => {
  return useMutation<StudentData, AxiosError, StudentData>({
    mutationFn: studentUpdateAPI,
    onSuccess: (data) => {
      // handle success
    },
    onError: (error) => {
      // handle error
    },
  });
};

export const useDeleteStudent = (): UseMutationResult<
  void,
  AxiosError,
  number | string
> => {
  return useMutation<void, AxiosError, number | string>({
    mutationFn: studentDeleteAPI,
    onSuccess: (data) => {
      // handle success
    },
    onError: (error) => {
      // handle error
    },
  });
};

export const useListAddress = (
  studentId: number | string
): UseMutationResult<AddressData[], AxiosError> => {
  return useMutation<AddressData[], AxiosError>({
    mutationFn: () => addressListAPI(studentId),
    onSuccess: (data) => {
      // handle success
    },
    onError: (error) => {
      // handle error
    },
  });
};

export const useCreateAddress = (
  studentId: number | string
): UseMutationResult<AddressData, AxiosError, AddressData> => {
  return useMutation<AddressData, AxiosError, AddressData>({
    mutationFn: (data) => addressCreateAPI(studentId, data),
    onSuccess: (data) => {
      // handle success
    },
    onError: (error) => {
      // handle error
    },
  });
};

export const useViewAddress = (
  studentId: number | string,
  addressId: number | string
): UseMutationResult<AddressData, AxiosError> => {
  return useMutation<AddressData, AxiosError>({
    mutationFn: () => addressViewAPI(studentId, addressId),
    onSuccess: (data) => {
      // handle success
    },
    onError: (error) => {
      // handle error
    },
  });
};

export const useUpdateAddress = (
  studentId: number | string,
  addressId: number | string
): UseMutationResult<AddressData, AxiosError, AddressData> => {
  return useMutation<AddressData, AxiosError, AddressData>({
    mutationFn: (data) => addressUpdateAPI(studentId, addressId, data),
    onSuccess: (data) => {
      // handle success
    },
    onError: (error) => {
      // handle error
    },
  });
};

export const useDeleteAddress = (
  studentId: number | string,
  addressId: number | string
): UseMutationResult<void, AxiosError> => {
  return useMutation<void, AxiosError>({
    mutationFn: () => addressDeleteAPI(studentId, addressId),
    onSuccess: (data) => {
      // handle success
    },
    onError: (error) => {
      // handle error
    },
  });
};
