// src/routes/AppRoutes.jsx


import { Route, Routes } from 'react-router-dom';
import HomePage from '../Layout/HomePage';
import AllBooks from '../UIComponents/BooksancCategoriesComponents/AllBooks';
// Importa otros componentes de página aquí

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      {/* Agrega más rutas aquí */}


      {/* Rutas de Libros y Categorias */}
      <Route path="/allbooks" element={<AllBooks />} />


    </Routes>
  );
};

export default AppRoutes;
