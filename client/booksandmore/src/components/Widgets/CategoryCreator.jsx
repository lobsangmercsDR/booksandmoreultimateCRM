import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  ThemeProvider,
  Modal,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useDarkmode } from '../../context/DarkmodeContext';
import { createTheme, useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';

const CategoryCreator = () => {
  const { darkMode } = useDarkmode();
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
      background: {
        default: darkMode ? '#303030' : '#f5f5f5',
        paper: darkMode ? '#424242' : '#fff',
      },
      text: {
        primary: darkMode ? '#fff' : '#000',
        secondary: darkMode ? '#b0bec5' : '#4f5b62',
      },
    },
    typography: {
      fontSize: 12,
    },
  });

  const [categoryName, setCategoryName] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [csrfToken, setCsrfToken] = useState('');
  const [reloadKey, setReloadKey] = useState(0); // Estado para forzar la recarga del componente

  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const response = await axios.get('http://localhost:3000/csrf-token', {
          withCredentials: true,
        });
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Error al obtener el token CSRF:', error);
      }
    };

    getCsrfToken();
    fetchCategories();
  }, [reloadKey]); // Dependencia añadida para forzar la recarga

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/categories', {
        headers: {
          'X-CSRF-Token': csrfToken,
        },
        withCredentials: true,
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = async () => {
    if (categoryName.trim() !== '' && !categories.some(cat => cat.name === categoryName)) {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/categories',
          { name: categoryName },
          {
            headers: {
              'X-CSRF-Token': csrfToken,
            },
            withCredentials: true,
          }
        );

        setCategories([...categories, response.data]);
        setCategoryName('');
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  };

  const handleDeleteCategory = () => {
    if (categoryToDelete) {
      setOpenModal(true);
    }
  };

  const confirmDeleteCategory = async () => {
    if (!categoryToDelete) return;
    try {
      await axios.delete(`http://localhost:3000/api/categories/${categoryToDelete.categoryId}`, {
        headers: {
          'X-CSRF-Token': csrfToken,
        },
        withCredentials: true,
      });

      setCategories(categories.filter((cat) => cat.categoryId !== categoryToDelete.categoryId));
      setOpenModal(false);
      setCategoryToDelete(null);
      setSelectedCategory(null);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleAddSubcategory = async () => {
    if (selectedCategory && subcategoryName.trim() !== '') {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/categories/${selectedCategory.categoryId}/subcategories`,
          { name: subcategoryName },
          {
            headers: {
              'X-CSRF-Token': csrfToken,
            },
            withCredentials: true,
          }
        );

        const updatedCategory = { ...selectedCategory, subcategories: [...selectedCategory.subcategories, response.data] };
        const updatedCategories = categories.map((cat) =>
          cat.categoryId === selectedCategory.categoryId ? updatedCategory : cat
        );

        setCategories(updatedCategories);
        setSelectedCategory(updatedCategory);
        setSubcategoryName('');
      } catch (error) {
        console.error('Error adding subcategory:', error);
      }
    }
  };

  const handleDeleteSubcategory = async (subcategory) => {
    if (selectedCategory) {
      try {
        await axios.delete(`http://localhost:3000/api/categories/${selectedCategory.categoryId}/subcategories/${subcategory._id}`, {
          headers: {
            'X-CSRF-Token': csrfToken,
          },
          withCredentials: true,
        });

        const updatedCategory = { ...selectedCategory, subcategories: selectedCategory.subcategories.filter((sub) => sub._id !== subcategory._id) };
        const updatedCategories = categories.map((cat) =>
          cat.categoryId === selectedCategory.categoryId ? updatedCategory : cat
        );

        setCategories(updatedCategories);
        setSelectedCategory(updatedCategory);
      } catch (error) {
        console.error('Error deleting subcategory:', error);
      }
    }
  };

  const reloadComponent = () => setReloadKey(prevKey => prevKey + 1); // Función para forzar la recarga del componente

  const muiTheme = useTheme();
  const modalTextColor = muiTheme.palette.mode === 'dark' ? muiTheme.palette.common.white : muiTheme.palette.text.primary;

  return (
    <ThemeProvider theme={theme}>
      <Box mb={4}>
        <Box mb={2} display="flex" justifyContent="center">
          <TextField
            label="Category Name"
            variant="outlined"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            style={{ backgroundColor: muiTheme.palette.background.default, borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', marginRight: '8px' }}
          />
          <Button variant="contained" size="small" onClick={handleAddCategory} startIcon={<AddIcon />} style={{ backgroundColor: muiTheme.palette.primary.main, color: muiTheme.palette.common.white, boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)', '&:hover': { backgroundColor: muiTheme.palette.primary.dark } }}>
            Add Category
          </Button>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Paper
            elevation={8}
            style={{
              flex: 1,
              padding: '16px',
              marginRight: '16px',
              borderRadius: '16px',
              backgroundColor: muiTheme.palette.background.paper,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              overflowY: 'auto',
              maxHeight: '400px',
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" gutterBottom style={{ color: muiTheme.palette.text.primary, fontWeight: 'bold', marginBottom: '16px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
                Categories
              </Typography>
              <IconButton size="small" onClick={reloadComponent} style={{ color: muiTheme.palette.primary.main }}>
                <RefreshIcon />
              </IconButton>
            </Box>
            <List>
              {categories.map((category) => (
                <ListItem key={category.categoryId} button onClick={() => setSelectedCategory(category)}>
                  <ListItemText primary={category.name} />
                  <IconButton edge="end" aria-label="delete" onClick={(e) => {
                    e.stopPropagation();
                    setCategoryToDelete(category);
                    handleDeleteCategory();
                  }}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Paper>
          <Paper
            elevation={8}
            style={{
              flex: 1,
              padding: '16px',
              borderRadius: '16px',
              backgroundColor: muiTheme.palette.background.paper,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              overflowY: 'auto',
              maxHeight: '400px',
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" gutterBottom style={{ color: muiTheme.palette.text.primary, fontWeight: 'bold', marginBottom: '16px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
                Subcategories
              </Typography>
              <IconButton size="small" onClick={reloadComponent} style={{ color: muiTheme.palette.primary.main }}>
                <RefreshIcon />
              </IconButton>
            </Box>
            {selectedCategory ? (
              <>
                <List>
                  {selectedCategory.subcategories.map((subcategory) => (
                    <ListItem key={subcategory._id}>
                      <ListItemText primary={subcategory.name} />
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteSubcategory(subcategory)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
                <Box mt={2}>
                  <TextField
                    label="Subcategory Name"
                    variant="outlined"
                    value={subcategoryName}
                    onChange={(e) => setSubcategoryName(e.target.value)}
                    style={{ backgroundColor: muiTheme.palette.background.default, borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', marginRight: '8px' }}
                  />
                  <Button variant="contained" size="small" onClick={handleAddSubcategory} startIcon={<AddIcon />} style={{ backgroundColor: muiTheme.palette.primary.main, color: muiTheme.palette.common.white, boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)', '&:hover': { backgroundColor: muiTheme.palette.primary.dark } }}>
                    Add Subcategory
                  </Button>
                </Box>
              </>
            ) : (
              <Typography variant="body1" style={{ color: muiTheme.palette.text.secondary }}>
                Select a category to view its subcategories.
              </Typography>
            )}
          </Paper>
        </Box>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            width="300px"
            bgcolor={theme.palette.background.paper}
            p={4}
            borderRadius="16px"
            boxShadow={24}
          >
            <Typography variant="h6" gutterBottom style={{ color: modalTextColor }}>
              Confirm Deletion
            </Typography>
            <Typography variant="body1" gutterBottom style={{ color: modalTextColor }}>
              Are you sure you want to delete this category?
            </Typography>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button variant="contained" color="secondary" onClick={() => setOpenModal(false)} style={{ marginRight: '8px' }}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={confirmDeleteCategory}>
                Confirm
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default CategoryCreator;
