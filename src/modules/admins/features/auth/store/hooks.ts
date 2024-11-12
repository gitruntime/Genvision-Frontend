import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setCredentialError, setCredentials } from "./slice";
import { loginAPI } from "./api";

interface LoginCredentials {
  email: string;
  password: string;
}

interface ErrorResponse {
  errors: string[];
}

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation<any, AxiosError<ErrorResponse>, LoginCredentials>({
    mutationFn: loginAPI,
    onError: (error) => {
      if (error.response?.data?.errors) {
        dispatch(setCredentialError(error.response.data.errors));
      }
    },
    onSuccess: (data) => {
      dispatch(setCredentials(data?.data));
    },
    retry: false,
  });
};
