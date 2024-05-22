import { useState, useEffect } from 'react';
import axios from 'axios';
import { decodeToken } from 'react-jwt';
import { useNavigate } from 'react-router-dom';
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
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useDarkmode } from '../../../context/DarkmodeContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const AllUsers = () => {
  const { darkMode } = useDarkmode();
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const token = localStorage.getItem('token');
  let decodedToken = null;
  let isExpired = false;

  try {
    decodedToken = decodeToken(token);
    isExpired = decodedToken && (Date.now() >= decodedToken.exp * 1000);
  } catch (error) {
    console.error('Failed to decode token:', error);
  }

  const isAdmin = decodedToken && decodedToken.role === 'admin';
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    console.log('Token:', token);
    console.log('Decoded Token:', decodedToken);
    console.log('Is Expired:', isExpired);

    if (!token || isExpired || !isAdmin) {
      navigate('/unauthorized');
    }
  }, [token, isExpired, isAdmin, navigate, decodedToken]);

  const fetchCsrfToken = async () => {
    try {
      const response = await axios.get('http://localhost:3000/csrf-token', {
        withCredentials: true,
      });
      setCsrfToken(response.data.csrfToken);
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  };

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log('Response:', response.data);

      if (Array.isArray(response.data)) {
        setUsers(response.data);
        setFilteredUsers(response.data);
      } else {
        console.error('Expected an array but got:', response.data);
        setUsers([]);
        setFilteredUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
      setFilteredUsers([]);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query === '') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter((user) =>
          user.names.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase()) ||
          user.phone_number.includes(query) ||
          user.delivery_address.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const handleOpenDialog = (user, action) => {
    setSelectedUser(user);
    setConfirmAction(action);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setConfirmAction(null);
  };

  const handleOpenConfirmDialog = (user, action) => {
    setSelectedUser(user);
    setConfirmAction(action);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedUser(null);
    setConfirmAction(null);
  };

  const updateUser = (field, value) => {
    setSelectedUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  const handleConfirmAction = async () => {
    if (confirmAction === 'delete') {
      await deleteUser(selectedUser.id);
    } else if (confirmAction === 'edit') {
      await saveUser();
    }
    handleCloseConfirmDialog();
  };

  const saveUser = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/users/${selectedUser.id}`, selectedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-CSRF-Token': csrfToken,
        },
        withCredentials: true,
      });

      const updatedUser = response.data;
      const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-CSRF-Token': csrfToken,
        },
        withCredentials: true,
      });
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <TextField
            label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
        </Box>
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
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.names}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.phone_number}</TableCell>
                  <TableCell>{user.delivery_address}</TableCell>
                  <TableCell>{user.booksOrdered ? user.booksOrdered.join(', ') : ''}</TableCell>
                  <TableCell>{user.couponsUsed ? user.couponsUsed.join(', ') : ''}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleOpenDialog(user, 'edit')}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleOpenConfirmDialog(user, 'delete')}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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
                  value={selectedUser?.names || ''}
                  onChange={(e) => updateUser('names', e.target.value)}
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
                  value={selectedUser?.phone_number || ''}
                  onChange={(e) => updateUser('phone_number', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Delivery Address"
                  value={selectedUser?.delivery_address || ''}
                  onChange={(e) => updateUser('delivery_address', e.target.value)}
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
            <Button onClick={handleOpenConfirmDialog}>Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openConfirmDialog}
          onClose={handleCloseConfirmDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogContent>
            <Typography>
              {confirmAction === 'delete'
                ? 'Are you sure you want to delete this user?'
                : 'Are you sure you want to save changes?'}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
            <Button onClick={handleConfirmAction}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default AllUsers;
