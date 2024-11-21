import { Routes, Route } from 'react-router-dom';
import { MarksScreens } from '../screens';

export const MarksNavigator = () => {
    return (
      <Routes>
        <Route path="/" element={<MarksScreens.List/>} />
        <Route path="/:id" element={<MarksScreens.View/>} />
      </Routes>
    );
};