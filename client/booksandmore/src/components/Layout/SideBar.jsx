import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Switch } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { useDarkmode } from '../../context/DarkmodeContext';
import { Link as RouterLink } from 'react-router-dom';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

function SideBar() {
  const { darkMode, toggleDarkMode } = useDarkmode();
  const [open, setOpen] = useState({});

  const handleClick = (itemName) => {
    setOpen({ ...open, [itemName]: !open[itemName] });
  };

  const menuItems = [
    {
      title: 'Home',
      path: '/home', // Asegúrate de que esta ruta esté definida en tus Routes
      icon: <HomeIcon />
    },
    {
      title: "Libros y Categorias",
      icon: <BookIcon />,
      subItems: [
        { title: "Ver todos los libros" },
        { title: "Agregar Libro" },
        { title: "Categorias" },
        { title: "Agregar Categoria" },
      ]
    },
    {
      title: "Usuarios",
      icon: <PersonIcon />,
      subItems: [
        { title: "Todos los Usuarios" },
        { title: "Agregar usuario" },
      ]
    },
    {
      title: "Donaciones de libros",
      icon: <VolunteerActivismIcon />,
      subItems: [
        { title: "Historial de donaciones" },
        { title: "Donaciones pendientes" },
        { title: "Donaciones aceptadas" },
        { title: "Donaciones rechazadas" },
      ]
    },
    {
      title: "Ordenes",
      icon: <TwoWheelerIcon />,
      subItems: [
        { title: "Todas las Ordenes" },
        { title: "Ordenes pendientes" },
        { title: "Ordenes en proceso"},
        { title: "Ordenes completadas" },
        { title: "Ordenes canceladas" },

        {title: "Agregar Orden Perzonalizada"}

      ]
    },
    {
      title: "Cupones",
      icon: <ConfirmationNumberIcon />,
      subItems: [
        { title: "Todos los cupones" },
        { title: "Agregar cupon" },
        { title: "Cupones activos" },
        { title: "Cupones inactivos" },


      ]
    }
  ];

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <List>
          {menuItems.map(({ title, icon, subItems, path }) => (
            <React.Fragment key={title}>
              {!subItems ? (
                <RouterLink to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem button>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={title} />
                  </ListItem>
                </RouterLink>
              ) : (
                <>
                  <ListItem button onClick={() => handleClick(title)}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={title} />
                    {open[title] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={open[title]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {subItems.map((subItem) => (
                        <ListItem button key={subItem.title} sx={{ pl: 4 }}>
                          <ListItemText primary={subItem.title} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </>
              )}
            </React.Fragment>
          ))}
        </List>

        <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
          <ListItemIcon>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </ListItemIcon>
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            inputProps={{ 'aria-label': 'toggle dark mode' }}
          />
        </div>
      </Drawer>
    </ThemeProvider>
  );
}

export default SideBar;
