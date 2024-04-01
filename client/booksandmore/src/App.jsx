import { BrowserRouter as Router, } from 'react-router-dom';
import AppBarr from './components/Layout/AppBar'
import SideBar from './components/Layout/SideBar';
import { DarkmodeProvider } from './context/DarkmodeContext';
import AppRoutes from './components/Router/AppRoutes';



export default function App() {
  return (
    <Router>
      <DarkmodeProvider>
        <div className="flex">
          <SideBar />
          <div className="flex flex-col w-full">
            <AppBarr />
            <AppRoutes />


          </div>
        </div>

      </DarkmodeProvider>
    </Router>
  );
}
