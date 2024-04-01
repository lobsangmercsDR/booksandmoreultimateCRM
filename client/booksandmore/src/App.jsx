import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppBarr from './components/Layout/AppBar'
import SideBar from './components/Layout/SideBar';
import { DarkmodeProvider } from './context/DarkmodeContext';

import HomePage from './components/Layout/HomePage';

export default function App() {
  return (
    <Router>
      <DarkmodeProvider>
        <div className="flex">
          <SideBar />
          <div className="flex flex-col w-full">
            <AppBarr />
            <Routes>
              <Route path="/home" element={<HomePage />} />
            </Routes>

          </div>
        </div>

      </DarkmodeProvider>
    </Router>
  );
}
