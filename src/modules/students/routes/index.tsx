import { Routes, Route } from "react-router-dom";
import Sidebar from "../layout/layout";
import Dashboard from "../features/account/screens/dashboard";
import StudentAttendanceDashboard from "../features/class/screens/attendance";
import StudentMarksDetailedDashboard from "../features/class/screens/marks";
import AssignmentList from "../features/class/screens/assignments";
import ProfileUpdate from "../features/account/screens/account";
import AuthProtectedRoute from "@/modules/admins/routes/authprotected-router";
import StudentProtectedRoute from "./student-protected-route";
import ClassmatesList from "../features/class/components/classmates-list";
import TeachersList from "../features/class/components/teacher-list";
import ExamsList from "../features/class/components/exam-list";

const StudentNavigator: React.FC = () => {
  return (
    // <AuthProtectedRoute>
    <StudentProtectedRoute>
      <Sidebar>
        <Routes>
          <Route path="dashboard/" element={<Dashboard />} />
          <Route path="attendances/" element={<StudentAttendanceDashboard />} />
          <Route path="marks/" element={<StudentMarksDetailedDashboard />} />
          <Route path="assignments/" element={<AssignmentList />} />
          <Route path="profile/" element={<ProfileUpdate />} />
          <Route path="classmates/" element={<ClassmatesList />} />
          <Route path="teachers/" element={<TeachersList />} />
          <Route path="exams/" element={<ExamsList />} />
        </Routes>
      </Sidebar>
    </StudentProtectedRoute>
    // </AuthProtectedRoute>
  );
};

export default StudentNavigator;
