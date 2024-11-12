import { Routes, Route } from 'react-router-dom';
import { SubjectScreens } from '../screens';

export const SubjectNavigator = () => {
    return (
      <Routes>
        <Route path="/" element={<SubjectScreens.List/>} />
        <Route path="/:id" element={<SubjectScreens.View/>} />
      </Routes>
    );
};