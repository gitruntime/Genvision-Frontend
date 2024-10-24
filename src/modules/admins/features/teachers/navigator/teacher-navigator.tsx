import { Routes, Route } from 'react-router-dom';
import { TeacherScreens } from '../screens';

export const TeacherNavigator = () => {
    return (
      <Routes>
        <Route path="/" element={<TeacherScreens.List/>} />
        <Route path="/:id" element={<TeacherScreens.View/>} />
      </Routes>
    );
};