import { Routes, Route } from 'react-router-dom';
import { ExamScreens } from '../screens';

export const ExamNavigator = () => {
    return (
      <Routes>
        <Route path="/" element={<ExamScreens.List/>} />
        <Route path="/:id" element={<ExamScreens.View/>} />
      </Routes>
    );
};