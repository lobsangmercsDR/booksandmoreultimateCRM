import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDarkmode } from '../../../context/DarkmodeContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Datos simulados de usuarios
const simulatedUsers = [
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan@example.com',
    role: 'admin',
    phone: '+1 234 567 890',
    deliveryAddress: '123 Main St, City, Country',
    booksOrdered: ['Book 1', 'Book 2'],
    couponsUsed: ['SUMMER10', 'BESTSELLER20'],
  },
  {
    id: 2,
    name: 'María García',
    email: 'maria@example.com',
    role: 'customer',
    phone: '+1 456 789 012',
    deliveryAddress: '456 Oak Ave, City, Country',
    booksOrdered: ['Book 3', 'Book 4', 'Book 5'],
    couponsUsed: [],
  },
  {
    id: 3,
    name: 'Pedro Rodríguez',
    email: 'pedro@example.com',
    role: 'customer',
    phone: '+1 678 901 234',
    deliveryAddress: '789 Elm St, City, Country',
    booksOrdered: ['Book 6'],
    couponsUsed: ['BLACKFRIDAY30'],
  },
  {
    id: 4,
    name: 'Ana Martínez',
    email: 'ana@example.com',
    role: 'admin',
    phone: '+1 890 123 456',
    deliveryAddress: '135 Pine Rd, City, Country',
    booksOrdered: [],
    couponsUsed: [],
  },
  // Agrega más usuarios simulados aquí
];


const AllUsers = () => {
  const { darkMode } = useDarkmode();
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const [users, setUsers] = useState(simulatedUsers);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Función para abrir el diálogo de edición de usuario
  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  // Función para cerrar el diálogo de edición de usuario
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  // Función para actualizar un campo del usuario seleccionado
  const updateUser = (field, value) => {
    setSelectedUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  // Función para guardar los cambios realizados al usuario
  const saveUser = () => {
    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id ? selectedUser : user
    );
    setUsers(updatedUsers);
    handleCloseDialog();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Delivery Address</TableCell>
                <TableCell>Books Ordered</TableCell>
                <TableCell>Coupons Used</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.deliveryAddress}</TableCell>
                  <TableCell>{user.booksOrdered.join(', ')}</TableCell>
                  <TableCell>{user.couponsUsed.join(', ')}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleOpenDialog(user)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Diálogo de edición de usuario */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  value={selectedUser?.name || ''}
                  onChange={(e) => updateUser('name', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  value={selectedUser?.email || ''}
                  onChange={(e) => updateUser('email', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone"
                  type="tel"
                  value={selectedUser?.phone || ''}
                  onChange={(e) => updateUser('phone', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Delivery Address"
                  value={selectedUser?.deliveryAddress || ''}
                  onChange={(e) => updateUser('deliveryAddress', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Books Ordered"
                  value={(selectedUser?.booksOrdered || []).join(', ')}
                  onChange={(e) =>
                    updateUser('booksOrdered', e.target.value.split(','))
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Coupons Used"
                  value={(selectedUser?.couponsUsed || []).join(', ')}
                  onChange={(e) =>
                    updateUser('couponsUsed', e.target.value.split(','))
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    value={selectedUser?.role || ''}
                    onChange={(e) => updateUser('role', e.target.value)}
                    label="Role"
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="customer">Customer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={saveUser}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default AllUsers;
