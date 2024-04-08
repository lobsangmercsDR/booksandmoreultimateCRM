import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  createTheme,
  ThemeProvider,
  useTheme,
} from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Datos simulados
const simulatedDonations = [
  {
    id: 1,
    donorName: 'Biblioteca Central',
    pickupRequired: true,
    address: 'Calle Falsa 123, Ciudad, País',
    email: 'contacto@bibliotecacentral.com',
    contactNumber: '+1 234 567 890',
    donationImage: 'https://via.placeholder.com/350',
    bookType: 'Novela',
  },
  {
    id: 2,
    donorName: 'Colegio San José',
    pickupRequired: false,
    address: '',
    email: 'info@colegiosanjose.edu',
    contactNumber: '+1 345 678 901',
    donationImage: 'https://via.placeholder.com/150',
    bookType: 'Educativo',
  },
  {
    id: 3,
    donorName: 'Grupo de Lectura Las Palmas',
    pickupRequired: true,
    address: 'Avenida Principal 456, Ciudad, País',
    email: 'grupolecturalaspalmas@example.com',
    contactNumber: '+1 456 789 012',
    donationImage: 'https://via.placeholder.com/150',
    bookType: 'Historia',
  },
  {
    id: 4,
    donorName: 'Ana Martínez',
    pickupRequired: true,
    address: 'Calle del Sol 789, Ciudad, País',
    email: 'ana.martinez@example.com',
    contactNumber: '+1 567 890 123',
    donationImage: 'https://via.placeholder.com/150',
    bookType: 'Ciencia Ficción',
  },
  {
    id: 5,
    donorName: 'Carlos Gómez',
    pickupRequired: false,
    address: '',
    email: 'carlos.gomez@example.com',
    contactNumber: '+1 678 901 234',
    donationImage: 'https://via.placeholder.com/150',
    bookType: 'Fantasía',
  },
  {
    id: 6,
    donorName: 'Tienda de Libros El Ateneo',
    pickupRequired: true,
    address: 'Boulevard de los Libros 101, Ciudad, País',
    email: 'contacto@elateneo.com',
    contactNumber: '+1 789 012 345',
    donationImage: 'https://via.placeholder.com/150',
    bookType: 'Biografías',
  },
  {
    id: 7,
    donorName: 'Universidad del Saber',
    pickupRequired: true,
    address: 'Avenida de la Ciencia 202, Ciudad, País',
    email: 'universidaddelsaber@edu.com',
    contactNumber: '+1 890 123 456',
    donationImage: 'https://via.placeholder.com/150',
    bookType: 'Técnico',
  },
  {
    id: 8,
    donorName: 'Lectores Compulsivos Grupo',
    pickupRequired: false,
    address: '',
    email: 'lectorescompulsivos@groups.com',
    contactNumber: '+1 901 234 567',
    donationImage: 'https://via.placeholder.com/150',
    bookType: 'Novela Gráfica',
  },
  {
    id: 9,
    donorName: 'Familia Rodríguez López',
    pickupRequired: true,
    address: 'Residencial Las Flores 303, Ciudad, País',
    email: 'fam.rodriguezlopez@example.com',
    contactNumber: '+1 012 345 678',
    donationImage: 'https://via.placeholder.com/150',
    bookType: 'Literatura Infantil',
  },
  {
    id: 10,
    donorName: 'Club de Ajedrez Torre Negra',
    pickupRequired: true,
    address: 'Plaza de los Peones 404, Ciudad, País',
    email: 'clubajedreztorrenegra@example.com',
    contactNumber: '+1 123 456 789',
    donationImage: 'https://via.placeholder.com/150',
    bookType: 'Deportivo',
  },
];

const useDarkmode = () => ({ darkMode: false }); // Implementación dummy

const BookDonationsManager = () => {
  const { darkMode } = useDarkmode();
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)',
            },
          },
        },
      },
    },
  });

  const [donations, setDonations] = useState(simulatedDonations);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleOpenImageDialog = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
    setSelectedImage('');
  };

  const acceptDonation = (id) => {
    // Lógica de aceptación
    console.log(`Donation ${id} accepted`);
  };

  const rejectDonation = (id) => {
    // Lógica de rechazo
    console.log(`Donation ${id} rejected`);
  };

  const fade = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ margin: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Donante</TableCell>
                <TableCell>Recolección</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Contacto</TableCell>
                <TableCell>Imagen</TableCell>
                <TableCell>Tipo de Libro</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {donations.map((donation) => (
                <animated.tr key={donation.id} style={fade}>
                  <TableCell>{donation.donorName}</TableCell>
                  <TableCell>{donation.pickupRequired ? 'Sí' : 'No'}</TableCell>
                  <TableCell>{donation.address}</TableCell>
                  <TableCell>{donation.email}</TableCell>
                  <TableCell>{donation.contactNumber}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenImageDialog(donation.donationImage)}>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{donation.bookType}</TableCell>
                  <TableCell>
                    <IconButton color="success" onClick={() => acceptDonation(donation.id)}>
                      <CheckIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => rejectDonation(donation.id)}>
                      <CloseIcon />
                    </IconButton>
                  </TableCell>
                </animated.tr>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Diálogo de imagen */}
        <Dialog open={openImageDialog} onClose={handleCloseImageDialog}>
          <DialogContent>
            <img src={selectedImage} alt="Donación" style={{ maxWidth: '100%', height: 'auto' }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseImageDialog}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default BookDonationsManager;
