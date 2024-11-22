import { Routes, Route } from "react-router-dom";
import { ClassList } from "../screens";
import { ExamListPreview } from "../screens/exam-list";

export const ClassNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<ClassList />} />
      <Route path="/exams" element={<ExamListPreview />} />
    </Routes>
  );
};
