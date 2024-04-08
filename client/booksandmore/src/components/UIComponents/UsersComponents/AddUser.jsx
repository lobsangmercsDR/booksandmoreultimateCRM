import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import  { useState } from 'react';

// Componente para crear un nuevo usuario
const CreateUser = ({ addUser }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
    deliveryAddress: '',
    booksOrdered: [],
    couponsUsed: [],
  });

  // Función para manejar el cambio en los inputs del formulario
  const handleChange = (field, value) => {
    setNewUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  // Función para agregar un nuevo usuario a la lista
  const handleAddUser = () => {
    addUser({ ...newUser, id: Date.now() }); // Simulación de ID único para el ejemplo
    setNewUser({
      name: '',
      email: '',
      role: '',
      phone: '',
      deliveryAddress: '',
      booksOrdered: [],
      couponsUsed: [],
    });
  };

  return (
    <Box sx={{ marginTop: 2, marginBottom: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Name"
            value={newUser.name}
            onChange={(e) => handleChange('name', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Email"
            type="email"
            value={newUser.email}
            onChange={(e) => handleChange('email', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="Phone"
            type="tel"
            value={newUser.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Delivery Address"
            value={newUser.deliveryAddress}
            onChange={(e) => handleChange('deliveryAddress', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              value={newUser.role}
              onChange={(e) => handleChange('role', e.target.value)}
              label="Role"
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="customer">Customer</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Button variant="contained" color="primary" onClick={handleAddUser} fullWidth>
            Add User
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateUser;
