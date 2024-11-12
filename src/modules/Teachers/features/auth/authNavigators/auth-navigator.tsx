import { Routes, Route } from 'react-router-dom';
import { AuthScreens } from '../authScreens';
// import { Sidebar } from '@/modules/admins/layout/sidebar-layout';


export const AuthNavigator = () => {
    return (
      <Routes>
        <Route path="/login" element={<AuthScreens.LogIn/>} />
      </Routes>
    );
};

