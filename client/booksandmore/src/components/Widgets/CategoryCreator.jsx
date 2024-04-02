import  { useState } from 'react';
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  ThemeProvider,
} from '@mui/material';
import { useDarkmode } from '../../context/DarkmodeContext';
import { createTheme } from '@mui/material/styles';

const CategoryCreator = () => {
  const { darkMode } = useDarkmode();
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);

  const handleAddCategory = () => {
    if (categoryName.trim() !== '' && !categories.includes(categoryName)) {
      setCategories([...categories, categoryName]);
      setCategoryName('');
      // Aquí podrías también enviar la nueva categoría a un backend si es necesario
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ padding: '20px', margin: '20px 0' }}>
        <Typography variant="h6" gutterBottom>
          Create New Category
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            '& .MuiTextField-root': { mr: 1 },
          }}
        >
          <TextField
            label="Category Name"
            variant="outlined"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <Button variant="contained" onClick={handleAddCategory}>
            Add Category
          </Button>
        </Box>
        {categories.length > 0 && (
          <Box mt={2}>
            <Typography variant="subtitle1">Existing Categories:</Typography>
            <ul>
              {categories.map((category, index) => (
                <li key={index}>{category}</li>
              ))}
            </ul>
          </Box>
        )}
      </Paper>
    </ThemeProvider>
  );
};

export default CategoryCreator;
