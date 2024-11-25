import { jwtDecode } from "jwt-decode";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface StudentProtectedRouteProps {
  children: ReactNode;
}

interface JwtPayload {
  userRole: string;
}

const StudentProtectedRoute: React.FC<StudentProtectedRouteProps> = ({
  children,
}) => {
  const { token } = useSelector(
    (state: { auth: { token: string | null } }) => state.auth
  );

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  console.log(
    token,
    "0000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  );

  const decodedToken = jwtDecode(token?.accessToken);
  if (decodedToken?.userRole === "student") {
    return <>{children}</>;
  }
  return <Navigate to="/auth/login" />;
};

export default StudentProtectedRoute;
