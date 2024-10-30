import { getBaseURL } from "@/modules/admins/utils/axios-util";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { logIn,setLoginError } from "../store/auth-slice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const loginAPI = async ({ email, password }) => {
  const { data } = await axios.post(
    getBaseURL() + "/api/auth/login",
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const useLogin = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: loginAPI,
    onError: (error) => {  
      // @ts-ignore
      if (error.response && error.response.data.details) {
        // @ts-ignore
        dispatch(setLoginError({error:error?.response?.data?.details}))
      }
      // console.log(error, "thousi");
    },
    onSuccess: (data) => {
      console.log(data);
      dispatch(logIn({ token: data?.data?.accessToken }));
      // Handle successful login, e.g., redirect or store auth token
    }
  });
};
