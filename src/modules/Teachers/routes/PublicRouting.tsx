import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const PublicRouting = () => {
const cookies = new Cookies;
  const token = cookies.get("accessToken")
  return <>{!token ? <Outlet /> : <Navigate to="/" />}</>;
};

export default PublicRouting;