// src/routes/AppRoutes.jsx


import { Route, Routes } from 'react-router-dom';
import HomePage from '../Layout/HomePage';
import AllBooks from '../UIComponents/BooksancCategoriesComponents/AllBooks';
import UploadBook from '../UIComponents/BooksancCategoriesComponents/CreateBook';
// Importa otros componentes de página aquí

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      {/* Agrega más rutas aquí */}


      {/* Rutas de Libros y Categorias */}
      <Route path="/allbooks" element={<AllBooks />} />
      <Route path="/uploadbook" element={<UploadBook />} />
      {/* Agrega más rutas aquí */}


    </Routes>
  );
};

export default AppRoutes;
