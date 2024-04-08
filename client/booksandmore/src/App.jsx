// src/App.jsx
import { BrowserRouter as Router } from 'react-router-dom';
import { DarkmodeProvider } from './context/DarkmodeContext';
import AppRoutes from './components/Router/AppRoutes';

export default function App() {
  return (
    <Router>
      <DarkmodeProvider>
        <AppRoutes />
      </DarkmodeProvider>
    </Router>
  );
}
