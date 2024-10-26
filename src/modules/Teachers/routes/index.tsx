import { Routes, Route } from "react-router-dom";
import { TeacherNavigators } from "../features";
import { Sidebar } from "../layout/sidebar-layout";

const TeacherNavigator = () => {
  return (
    <>
      <Routes>
        <Route path="auth/*" element={<TeacherNavigators.Auth />} />
      </Routes>
      
      <Sidebar>
        <Routes>    
          <Route path="dashboard" />
          <Route path="students/*" element={<TeacherNavigators.Student />} />
          <Route path="parents/*" element={<TeacherNavigators.Parents />} />
          <Route path="class/*" element={<TeacherNavigators.Classes />} />
          <Route path="subject/*" element={<TeacherNavigators.Subjects />} />
          <Route path="/*"  />
        </Routes>
      </Sidebar>
    </>
  );
};

export default TeacherNavigator;
