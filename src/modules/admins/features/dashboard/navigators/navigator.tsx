import { Routes, Route } from "react-router-dom";
import SchoolDashboard from "../screens/dashboard";

export const DashboardNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<SchoolDashboard />} />
    </Routes>
  );
};
