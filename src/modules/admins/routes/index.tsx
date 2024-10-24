import { Routes, Route, useLocation } from "react-router-dom";
import { AdminNavigators } from "../features";
import { Sidebar } from "../layout/sidebar-layout";

const AdminNavigator: React.FC = () => {
  const { pathname } = useLocation();
  const isAuthRoute = pathname.startsWith("/admin/auth");

  return (
    <>
      <Routes>
        <Route path="auth/*" element={<AdminNavigators.Auth />} />
      </Routes>
      {!isAuthRoute && (
        <Sidebar>
          <Routes>
            <Route path="dashboard/" />
            <Route path="students/*" element={<AdminNavigators.Student />} />
            <Route path="teachers/*" element={<AdminNavigators.Teacher />} />
            <Route path="/*" element={<AdminNavigators.Authorization />} />
          </Routes>
        </Sidebar>
      )}
    </>
  );
};

export default AdminNavigator;
