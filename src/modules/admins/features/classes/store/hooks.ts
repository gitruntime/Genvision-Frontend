import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { FetchDataParams } from "../../teachers/types";
import {
  ClassCreateAPI,
  ClassDeleteAPI,
  ClassListAPI,
  ClassUpdateAPI,
  SubjectListAPI,
} from "./api";
import { AxiosError } from "axios";

export const useListClass = ({
  page,
  size,
  sortBy,
  sortOrder,
}: FetchDataParams): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["admin", "classes", page, size, sortBy, sortOrder],
    queryFn: () =>
      ClassListAPI({
        page,
        size,
        sortBy,
        sortOrder,
      }),
  });
};

export const useCreateClass = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: ClassCreateAPI,
    retry: false,
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["admin", "classes"]);
    },
  });
};

export const useUpdateClass = (id:number | string) => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: (data: any) => ClassUpdateAPI(id, data),
    retry: false,
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["admin", "classes"]);
    },
  });
};

export const useDeleteClass = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: (id) => ClassDeleteAPI(id),
    retry: false,
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["admin", "classes"]);
    },
  });
};

export const useListSubject = ({
  page,
  size,
  sortBy,
  sortOrder,
}: FetchDataParams): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["admin", "subjects", page, size, sortBy, sortOrder],
    queryFn: () =>
      SubjectListAPI({
        page,
        size,
        sortBy,
        sortOrder,
      }),
  });
};

export const useCreateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: ClassCreateAPI,
    retry: false,
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["admin", "subjects"]);
    },
  });
};

export const useUpdateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    // @ts-ignore
    mutationFn: (id: any, data: any) => ClassUpdateAPI(id, data),
    retry: false,
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["admin", "classes"]);
    },
  });
};

export const useDeleteSubject = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: (id) => ClassDeleteAPI(id),
    retry: false,
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["admin", "subjects"]);
    },
  });
};
