import { Routes, Route } from 'react-router-dom';
import { StudentScreens } from '../screens';

export const StudentNavigator = () => {
    return (
      <Routes>
        <Route path="/" element={<StudentScreens.List/>} />
        <Route path="/:id" element={<StudentScreens.View/>} />
      </Routes>
    );
};