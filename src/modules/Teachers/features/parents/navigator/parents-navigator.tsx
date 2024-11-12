import { Routes, Route } from 'react-router-dom';
import { ParentScreens } from '../screens';

export const ParentsNavigator = () => {
    return (
      <Routes>
        <Route path="/" element={<ParentScreens.List/>} />
        <Route path="/:id" element={<ParentScreens.View/>} />
      </Routes>
    );
};