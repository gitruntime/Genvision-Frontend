import "./App.css";
import { Routes, Route } from "react-router-dom";
import AdminNavigator from "./modules/admins/routes";
import { FC } from "react";
import { TooltipProvider } from "./components/ui/tooltip";

const App: FC = () => {
  return (
    <TooltipProvider>
      <Routes>
        <Route path="admin/*" element={<AdminNavigator />} />
        {/* <Route path='teacher/*' element={<AdminNavigator />} /> */}
      </Routes>
    </TooltipProvider>
  );
};

export default App;
