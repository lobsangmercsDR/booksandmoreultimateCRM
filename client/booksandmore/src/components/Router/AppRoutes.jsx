// src/routes/AppRoutes.jsx
import { Route, Routes } from 'react-router-dom';
import LoginLayout from '../UIComponents/LoginComponents/LoginLayout';
import Dashboard from './Dashboard';
import PasswordResetForm from '../UIComponents/LoginComponents/ResetPassLayouts';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginLayout />} />
      <Route path="/reset/:token" element={<PasswordResetForm />} />
      <Route path="/*" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
