import { Routes, Route } from 'react-router-dom';
import { AssignmentScreens } from '../screens';

export const AssignmentNavigator = () => {
    return (
      <Routes>
        <Route path="/" element={<AssignmentScreens.List/>} />
        <Route path="/:id" element={<AssignmentScreens.View/>} />
      </Routes>
    );
};