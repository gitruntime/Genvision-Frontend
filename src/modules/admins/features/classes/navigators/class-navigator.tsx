import { Routes, Route } from "react-router-dom";
import { ClassList } from "../screens";

export const ClassNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<ClassList />} />
    </Routes>
  );
};
