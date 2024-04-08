// src/routes/AppRoutes.jsx
import { Route, Routes } from 'react-router-dom';
import LoginLayout from '../UIComponents/LoginComponents/LoginLayout';
import Dashboard from './Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginLayout />} />
      <Route path="/*" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
