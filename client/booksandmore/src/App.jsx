
import { BrowserRouter as Router } from 'react-router-dom';
import AppBarr from './components/Layout/AppBar';
import SideBar from './components/Layout/SideBar';
import { DarkmodeProvider } from './context/DarkmodeContext';
import AppRoutes from './components/Router/AppRoutes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDarkmode } from './context/DarkmodeContext'; // Importa el hook useDarkmode

export default function App() {
  return (
    <Router>
      <DarkmodeProvider>
        <AppWrapper />
      </DarkmodeProvider>
    </Router>
  );
}

function AppWrapper() {
  const { darkMode } = useDarkmode(); // Ahora se puede utilizar useDarkmode
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',

    },
  });

  const appStyles = {
    backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',

  };

  return (
    <ThemeProvider theme={theme}>
      <div className="flex" style={appStyles}>
        <SideBar />
        <div className="flex flex-col w-full">
          <AppBarr />
          <AppRoutes />
        </div>
      </div>
    </ThemeProvider>
  );
}
