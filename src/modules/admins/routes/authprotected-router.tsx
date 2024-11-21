import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface AuthProtectedRouteProps {
  children: ReactNode;
}

const AuthProtectedRoute: React.FC<AuthProtectedRouteProps> = ({
  children,
}) => {
  const { token } = useSelector((state: any) => state.auth);

  return token ? children : <Navigate to={"/auth/login"} />;
};

export default AuthProtectedRoute;
