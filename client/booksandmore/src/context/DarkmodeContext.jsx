// DarkmodeContext.js
import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { createTheme } from '@mui/material/styles';

const DarkmodeContext = createContext();

// Define tu función aquí o impórtala si está en otro archivo
const getTheme = (darkMode) => {
  const darkBlack = '#121212'; // El color de fondo deseado para el modo oscuro

  return createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      ...(darkMode && {
        background: {
          default: darkBlack,
          paper: darkBlack,
        },
      }),
    },
    // Otros ajustes del tema pueden ir aquí
  });
};

export const useDarkmode = () => useContext(DarkmodeContext);

export const DarkmodeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Llama a getTheme aquí para que el tema se actualice cuando cambie darkMode
  const theme = getTheme(darkMode);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    // Pasa el tema como parte del contexto para que los consumidores puedan usarlo
    <DarkmodeContext.Provider value={{ darkMode, toggleDarkMode, theme }}>
      {children}
    </DarkmodeContext.Provider>
  );
};

DarkmodeProvider.propTypes = {
  children: PropTypes.node.isRequired
};
