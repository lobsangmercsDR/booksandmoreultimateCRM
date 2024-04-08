import { useState } from 'react';
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
  Divider,
} from '@mui/material';
import { useDarkmode } from '../../context/DarkmodeContext';
import { createTheme, useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';

const CategoryCreator = () => {
  const { darkMode } = useDarkmode();
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#FF9800', // Naranja vibrante
      },
      secondary: {
        main: '#9C27B0', // Púrpura
      },
    },
  });

  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategoryName, setSubcategoryName] = useState('');
  const [expandedCategories, setExpandedCategories] = useState([]);

  const handleAddCategory = () => {
    if (categoryName.trim() !== '' && !categories.includes(categoryName)) {
      setCategories([...categories, { name: categoryName, subcategories: [] }]);
      setCategoryName('');
    }
  };

  const handleDeleteCategory = (category) => {
    setCategoryToDelete(category);
    setOpenModal(true);
  };

  const confirmDeleteCategory = () => {
    setCategories(categories.filter((cat) => cat.name !== categoryToDelete.name));
    setOpenModal(false);
    setCategoryToDelete('');
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSubcategoryName('');
    setExpandedCategories((prevExpandedCategories) =>
      prevExpandedCategories.includes(category.name)
        ? prevExpandedCategories.filter((name) => name !== category.name)
        : [...prevExpandedCategories, category.name]
    );
  };

  const handleAddSubcategory = () => {
    if (subcategoryName.trim() !== '') {
      const updatedCategories = categories.map((cat) => {
        if (cat === selectedCategory) {
          return {
            ...cat,
            subcategories: [...cat.subcategories, subcategoryName],
          };
        }
        return cat;
      });
      setCategories(updatedCategories);
      setSubcategoryName('');
    }
  };

  const handleDeleteSubcategory = (category, subcategory) => {
    const updatedCategories = categories.map((cat) => {
      if (cat === category) {
        return {
          ...cat,
          subcategories: cat.subcategories.filter((sub) => sub !== subcategory),
        };
      }
      return cat;
    });
    setCategories(updatedCategories);
  };

  const muiTheme = useTheme();
  const modalTextColor = muiTheme.palette.mode === 'dark' ? muiTheme.palette.common.white : muiTheme.palette.text.primary;

  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={8}
        style={{
          padding: '32px',
          margin: '32px 0',
          borderRadius: '16px',
          backgroundColor: muiTheme.palette.background.paper,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{
            color: muiTheme.palette.text.primary,
            fontWeight: 'bold',
            marginBottom: '24px',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          }}
        >
          Create New Category
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            '& .MuiTextField-root': { mr: 2 },
          }}
        >
          <TextField
            label="Category Name"
            variant="outlined"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            style={{
              backgroundColor: muiTheme.palette.background.default,
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Button
            variant="contained"
            onClick={handleAddCategory}
            startIcon={<AddIcon />}
            style={{
              backgroundColor: muiTheme.palette.primary.main,
              color: muiTheme.palette.common.white,
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: muiTheme.palette.primary.dark,
              },
            }}
          >
            Add Category
          </Button>
        </Box>
        {categories.length > 0 && (
          <Box mt={4}>
            <Typography
              variant="h6"
              style={{
                color: muiTheme.palette.text.primary,
                fontWeight: 'bold',
                marginBottom: '16px',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
              }}
            >
              Existing Categories:
            </Typography>
            <List>
              {categories.map((category, index) => (
                <div key={index}>
                  <ListItem
                    button
                    onClick={() => handleCategoryClick(category)}
                    style={{
                      backgroundColor: muiTheme.palette.background.default,
                      borderRadius: '8px',
                      marginBottom: '8px',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                      transition: 'box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                      },
                    }}
                  >
                    <ListItemText
                      primary={`${category.name} (${category.subcategories.length})`}
                      primaryTypographyProps={{
                        style: {
                          color: muiTheme.palette.text.primary,
                          fontWeight: 'bold',
                          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                        },
                      }}
                    />
                    <IconButton
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(category);
                      }}
                      style={{ color: muiTheme.palette.error.main }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    {expandedCategories.includes(category.name) ? (
                      <ExpandLessIcon style={{ color: muiTheme.palette.secondary.main }} />
                    ) : (
                      <ExpandMoreIcon style={{ color: muiTheme.palette.secondary.main }} />
                    )}
                  </ListItem>
                  {expandedCategories.includes(category.name) && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        pl: 4,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          '& .MuiTextField-root': { mr: 2 },
                        }}
                      >
                        <TextField
                          label="Subcategory Name"
                          variant="outlined"
                          value={subcategoryName}
                          onChange={(e) => setSubcategoryName(e.target.value)}
                          style={{
                            backgroundColor: muiTheme.palette.background.default,
                            borderRadius: '8px',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                          }}
                        />
                        <Button
                          variant="contained"
                          onClick={handleAddSubcategory}
                          startIcon={<AddIcon />}
                          style={{
                            backgroundColor: muiTheme.palette.secondary.main,
                            color: muiTheme.palette.common.white,
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                            '&:hover': {
                              backgroundColor: muiTheme.palette.secondary.dark,
                            },
                          }}
                        >
                          Add Subcategory
                        </Button>
                      </Box>
                      {category.subcategories.length > 0 && (
                        <Box mt={2}>
                          <Typography
                            variant="subtitle1"
                            style={{
                              color: muiTheme.palette.text.secondary,
                              fontWeight: 'bold',
                              marginBottom: '8px',
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                            }}
                          >
                            Subcategories:
                          </Typography>
                          <List dense>
                            {category.subcategories.map((subcategory, index) => (
                              <ListItem
                                key={index}
                                disablePadding
                                style={{
                                  backgroundColor: muiTheme.palette.background.default,
                                  borderRadius: '8px',
                                  marginBottom: '4px',
                                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                                }}
                              >
                                <ListItemText
                                  primary={subcategory}
                                  primaryTypographyProps={{
                                    style: {
                                      color: muiTheme.palette.text.primary,
                                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                                    },
                                  }}
                                />
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => handleDeleteSubcategory(category, subcategory)}
                                  style={{ color: muiTheme.palette.error.main }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )}
                    </Box>
                  )}
                  <Divider style={{ marginTop: '16px', marginBottom: '16px' }} />
                </div>
              ))}
            </List>
          </Box>
        )}
      </Paper>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="delete-category-modal"
        aria-describedby="delete-category-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: muiTheme.palette.background.paper,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            p: 4,
            borderRadius: '16px',
          }}
        >
          <Typography
            id="delete-category-modal"
            variant="h6"
            component="h2"
            color={modalTextColor}
            style={{
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
            }}
          >
            Confirm Delete Category
          </Typography>
          <Typography
            id="delete-category-description"
            sx={{ mt: 2 }}
            color={modalTextColor}
            style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}
          >
            Are you sure you want to delete the category "{categoryToDelete.name}"?
          </Typography>
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button
              onClick={() => setOpenModal(false)}
              style={{
                backgroundColor: muiTheme.palette.background.default,
                color: muiTheme.palette.text.primary,
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDeleteCategory}
              color="error"
              sx={{ ml: 2 }}
              variant="contained"
              style={{
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default CategoryCreator;
