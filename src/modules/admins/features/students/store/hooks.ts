import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { FetchDataParams } from "../../teachers/types";
import { studentCreateAPI, StudentListAPI } from "./api";
import { AxiosError } from "axios";

export const useListStudents = ({
  page,
  size,
  sortBy,
  sortOrder,
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
    onSuccess: (data) => {
      queryClient.invalidateQueries(["admin", "students"]);
    },
    retry: false,
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

// // Define types for student and address data (replace 'any' with actual types as needed)
// interface StudentData {
//   // define properties based on actual student data structure
// }

// interface AddressData {
//   // define properties based on actual address data structure
// }

// export const useListStudent = (): UseMutationResult<
//   StudentData[],
//   AxiosError
// > => {
//   return useMutation<StudentData[], AxiosError>({
//     mutationFn: studentListAPI,
//     onSuccess: (data) => {
//       // handle success
//     },
//     onError: (error) => {
//       // handle error
//     },
//   });
// };

// export const useCreateStudent = (): UseMutationResult<
//   StudentData,
//   AxiosError,
//   StudentData
// > => {
//   const dispatch = useDispatch();
//   return useMutation<StudentData, AxiosError, StudentData>({
//     mutationFn: studentCreateAPI,
//     onSuccess: (data) => {
//       // handle success
//     },
//     onError: (error) => {
//       // handle error
//     },
//     retry: false,
//   });
// };

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

// export const useListAddress = (
//   studentId: number | string
// ): UseMutationResult<AddressData[], AxiosError> => {
//   return useMutation<AddressData[], AxiosError>({
//     mutationFn: () => addressListAPI(studentId),
//     onSuccess: (data) => {
//       // handle success
//     },
//     onError: (error) => {
//       // handle error
//     },
//   });
// };

// export const useCreateAddress = (
//   studentId: number | string
// ): UseMutationResult<AddressData, AxiosError, AddressData> => {
//   return useMutation<AddressData, AxiosError, AddressData>({
//     mutationFn: (data) => addressCreateAPI(studentId, data),
//     onSuccess: (data) => {
//       // handle success
//     },
//     onError: (error) => {
//       // handle error
//     },
//   });
// };

// export const useViewAddress = (
//   studentId: number | string,
//   addressId: number | string
// ): UseMutationResult<AddressData, AxiosError> => {
//   return useMutation<AddressData, AxiosError>({
//     mutationFn: () => addressViewAPI(studentId, addressId),
//     onSuccess: (data) => {
//       // handle success
//     },
//     onError: (error) => {
//       // handle error
//     },
//   });
// };

// export const useUpdateAddress = (
//   studentId: number | string,
//   addressId: number | string
// ): UseMutationResult<AddressData, AxiosError, AddressData> => {
//   return useMutation<AddressData, AxiosError, AddressData>({
//     mutationFn: (data) => addressUpdateAPI(studentId, addressId, data),
//     onSuccess: (data) => {
//       // handle success
//     },
//     onError: (error) => {
//       // handle error
//     },
//   });
// };

// export const useDeleteAddress = (
//   studentId: number | string,
//   addressId: number | string
// ): UseMutationResult<void, AxiosError> => {
//   return useMutation<void, AxiosError>({
//     mutationFn: () => addressDeleteAPI(studentId, addressId),
//     onSuccess: (data) => {
//       // handle success
//     },
//     onError: (error) => {
//       // handle error
//     },
//   });
// };
