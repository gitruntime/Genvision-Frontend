import { getBaseURL } from "@/modules/admins/utils/axios-util";
import axios from "axios";

interface LoginCredentials {
  email: string;
  password: string;
}

export const loginAPI = async ({
  email,
  password,
}: LoginCredentials): Promise<any> => {
  const { data } = await axios.post<any>(`${getBaseURL()}/auth/login`, {
    email,
    password,
  });
  return data;
};
