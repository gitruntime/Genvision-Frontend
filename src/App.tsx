import './App.css'
import { Routes,Route } from 'react-router-dom'
import AdminNavigator from './modules/admins/routes'
import TeacherNavigator from './modules/Teachers/routes'
import { TooltipProvider } from '@radix-ui/react-tooltip';
import AuthLogin from './modules/Teachers/features/auth/authScreens/auth-login';
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import { ToastContainer } from "react-toastify";
import PublicRouting from './modules/Teachers/routes/PublicRouting';
import PrivateRouting from './modules/Teachers/routes/PrivateRouting';

function App() {
  return (
    
    <>
    <TooltipProvider>
      <Routes>
        <Route path='/' element={<PublicRouting/>}>
           <Route path='/' element={<AuthLogin/>}/>
        </Route>

          <Route path='/' element={<PrivateRouting/>}>
          <Route path='admin/*' element={<AdminNavigator />} />
          <Route path='teacher/*' element={<TeacherNavigator />} />
          </Route>
      </Routes>
        <ToastContainer />
    </TooltipProvider>
    </>
  )
}

export default App
