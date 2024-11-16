import { Routes, Route, useLocation } from "react-router-dom";
import { AdminNavigators } from "../features";
import { Sidebar } from "../layout/sidebar-layout";
import { Provider } from "react-redux";
import { store } from "../store";
import AuthProtectedRoute from "./authprotected-router";
import { DashboardNavigator } from "../features/dashboard/navigators/navigator";

const AdminNavigator: React.FC = () => {
  const { pathname } = useLocation();
  const isAuthRoute = pathname.startsWith("/admin/auth");

  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="auth/*" element={<AdminNavigators.Auth />} />
        </Routes>
        {!isAuthRoute && (
          <Sidebar>
            <AuthProtectedRoute>
              <Routes>
                <Route path="dashboard/" element={<DashboardNavigator />} />
                <Route
                  path="students/*"
                  element={<AdminNavigators.Student />}
                />
                <Route
                  path="teachers/*"
                  element={<AdminNavigators.Teacher />}
                />
                <Route path="classes/*" element={<AdminNavigators.Class />} />
                <Route path="/*" element={<AdminNavigators.Authorization />} />
              </Routes>
            </AuthProtectedRoute>
          </Sidebar>
        )}
      </Provider>
    </>
  );
};

export default AdminNavigator;
