import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/admin/auth/login");
    }
  }, [history]);

  return null;
};

export default RedirectComponent;
