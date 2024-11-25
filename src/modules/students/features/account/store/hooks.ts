import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { ProfileUpdateAPI, ProfileViewAPI } from "./api";
import { AxiosError } from "axios";

export const useProfileViewAPI = (): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["admin", "profile"],
    queryFn: ProfileViewAPI,
  });
};

export const useProfileUpdateAPI = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: (data) => ProfileUpdateAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "profile"]);
    },
    retry: false,
  });
};
