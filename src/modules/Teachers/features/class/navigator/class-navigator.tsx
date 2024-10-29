import { Routes, Route } from 'react-router-dom';
import { ClassScreens } from '../screens';

export const ClassNavigator = () => {
    return (
      <Routes>
        <Route path="/" element={<ClassScreens.List/>} />
        <Route path="/:id" element={<ClassScreens.View/>} />
      </Routes>
    );
};