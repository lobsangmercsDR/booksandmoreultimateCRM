import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
const DarkmodeContext = createContext();

export const useDarkmode = () => useContext(DarkmodeContext);

export const DarkmodeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <DarkmodeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkmodeContext.Provider>
  );
}

DarkmodeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

