import { getBaseURL } from "@/modules/admins/utils/axios-util";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setCredentialError, setCredentials } from "../store/slice";

// Define types for the login request and response
interface LoginCredentials {
  email: string;
  password: string;
}

interface ErrorResponse {
  errors: string[];
}

// Define the API function with explicit types
const loginAPI = async ({
  email,
  password,
}: LoginCredentials): Promise<any> => {
  const { data } = await axios.post<any>(`${getBaseURL()}/auth/login`, {
    email,
    password,
  });
  return data;
};

// Define the useLogin hook
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
      // @ts-ignore
      dispatch(setCredentials({ token: data.data }));
    },
    retry: false,
  });
};
