import { Navigate, Outlet } from "react-router-dom";

import Cookies from "universal-cookie";

const PrivateRouting = () => {
    const cookies = new Cookies;
    const token = cookies.get("accessToken")
  return (
    <>
      {token ? (
          <Outlet />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default PrivateRouting;
