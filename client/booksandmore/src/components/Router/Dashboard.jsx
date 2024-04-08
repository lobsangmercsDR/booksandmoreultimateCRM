// src/routes/Dashboard.jsx
import { Route, Routes } from 'react-router-dom';
import { useDarkmode } from '../../context/DarkmodeContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SideBar from '../Layout/SideBar';
import AppBarr from '../Layout/AppBar';
import HomePage from '../Layout/HomePage';
import AllBooks from '../UIComponents/BooksancCategoriesComponents/AllBooks';
import UploadBook from '../UIComponents/BooksancCategoriesComponents/CreateBook';
import AllUsers from '../UIComponents/UsersComponents/AllUsers';
import CreateUser from '../UIComponents/UsersComponents/AddUser';
import BookDonationsManager from '../UIComponents/DonationsComponents/DonationManager';

const Dashboard = () => {
  const { darkMode } = useDarkmode();
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
          <Routes>
            <Route path="/home" element={<HomePage />} />
            {/* Rutas de Libros y Categorías */}
            <Route path="/allbooks" element={<AllBooks />} />
            <Route path="/uploadbook" element={<UploadBook />} />
            {/* Rutas de Usuarios */}
            <Route path="/allusers" element={<AllUsers />} />
            <Route path="/adduser" element={<CreateUser />} />
            {/* Rutas de Donaciones */}
            <Route path="/donations" element={<BookDonationsManager />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
