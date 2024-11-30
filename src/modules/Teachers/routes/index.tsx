import { Routes, Route } from "react-router-dom";
import { TeacherNavigators } from "../features";
import { Sidebar } from "../layout/sidebar-layout";

const TeacherNavigator = () => {
  return (
    <>
      <Sidebar>
        <Routes>    
          <Route path="dashboard" />
          <Route path="students/*" element={<TeacherNavigators.Student />} />
          <Route path="parents/*" element={<TeacherNavigators.Parents />} />
          <Route path="class/*" element={<TeacherNavigators.Classes />} />
          <Route path="subject/*" element={<TeacherNavigators.Subjects />} />
          <Route path="profile/*" element={<TeacherNavigators.profile />}/>
        </Routes>
      </Sidebar>
    </>
  );
};

export default TeacherNavigator;
