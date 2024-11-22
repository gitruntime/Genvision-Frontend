import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import Sidebar from "../layout/layout";
import Dashboard from "../features/account/screens/dashboard";
import StudentAttendanceDashboard from "../features/class/screens/attendance";
import StudentMarksDetailedDashboard from "../features/class/screens/marks";
import AssignmentList from "../features/class/screens/assignments";
// import StudentAssignmentsDashboard from "../features/class/screens/assignments";

const StudentNavigator: React.FC = () => {
  return (
    <>
      <Sidebar>
        <Routes>
          <Route path="dashboard/" element={<Dashboard />} />
          <Route path="attendances/" element={<StudentAttendanceDashboard />} />
          <Route path="marks/" element={<StudentMarksDetailedDashboard />} />
          <Route path="assignments/" element={<AssignmentList />} />
          {/* <Route
            path="assignments/"
            element={<StudentAssignmentsDashboard />}
          /> */}

          {/* <Route path="students/*" element={<AdminNavigators.Student />} />
            <Route path="teachers/*" element={<AdminNavigators.Teacher />} />
            <Route path="classes/*" element={<AdminNavigators.Class />} />
            <Route path="/*" element={<AdminNavigators.Authorization />} /> */}
        </Routes>
      </Sidebar>
    </>
  );
};

export default StudentNavigator;
