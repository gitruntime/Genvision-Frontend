import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { FetchDataParams } from "../../teachers/types";
import { ClassCreateAPI, ClassListAPI } from "./api";
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
  return useMutation<any, AxiosError, any>({
    mutationFn: ClassCreateAPI,
    retry: false,
  });
};
