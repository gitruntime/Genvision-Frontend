import { Routes, Route } from "react-router-dom";
import AdminNavigator from "./modules/admins/routes";
import { FC } from "react";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TeacherNavigator from "./modules/Teachers/routes";
import LandingPage from "./page/landingpage";
import StudentNavigator from "./modules/students/routes";
import AuthLogin from "./modules/authentication/screens/auth-login";
import { Provider } from "react-redux";
import { store } from "./modules/admins/store";
const App: FC = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <TooltipProvider>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="auth/login/" element={<AuthLogin />} />
            <Route path="admin/*" element={<AdminNavigator />} />
            <Route path="teacher/*" element={<TeacherNavigator />} />
            <Route path="student/*" element={<StudentNavigator />} />
            {/* <Route path="parent/thousi/" element={<Dashboard />} /> */}
          </Routes>
        </Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
