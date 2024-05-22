import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
  TextField,
  Paper,
  Button,
  Typography,
  ThemeProvider,
  Checkbox,
  FormControlLabel,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Collapse,
  List,
  ListItem,
  ListItemText,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { useDarkmode } from '../../../context/DarkmodeContext';
import { createTheme } from '@mui/material/styles';
import CategoryCreator from '../../Widgets/CategoryCreator';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const UploadBook = () => {
  const { darkMode } = useDarkmode();
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const [book, setBook] = useState({
    name: '',
    author: '',
    categories: [],
    subcategories: [],
    description: '',
    price: '',
    condition: '',
    imageUrl: '',
  });
  const [useUrlForImage, setUseUrlForImage] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    fetchCategories();
    getCsrfToken();
  }, []);

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

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setBook({
      ...book,
      categories: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleSubcategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setBook({
      ...book,
      subcategories: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleDialogClose = (confirm) => {
    setIsDialogOpen(false);
    if (confirm) {
      handleUploadBook();
    }
  };

  const handleUploadBook = async () => {
    try {
      const payload = {
        title: book.name,
        author: book.author,
        categories: book.categories,
        subcategories: book.subcategories,
        description: book.description,
        price: parseFloat(book.price),
        condition: book.condition,
        image: useUrlForImage ? book.imageUrl : imageFile ? await uploadImage(imageFile) : '',
      };

      const response = await axios.post(
        'http://localhost:3000/api/books',
        payload,
        {
          headers: {
            'X-CSRF-Token': csrfToken,
          },
          withCredentials: true,
        }
      );

      console.log('Book uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading book:', error);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post('http://localhost:3000/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRF-Token': csrfToken,
      },
      withCredentials: true,
    });

    return response.data.imageUrl;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CategoryCreator />
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1 },
          '& .MuiButton-root': { m: 1 },
        }}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" gutterBottom>
          Upload New Book
        </Typography>
        <Paper style={{ padding: '20px', marginBottom: '20px' }}>
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Book Name"
                name="name"
                value={book.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Author"
                name="author"
                value={book.author}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Categories</InputLabel>
                <Select
                  multiple
                  name="categories"
                  value={book.categories}
                  onChange={handleCategoryChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={categories.find(cat => cat.categoryId === value)?.name} />
                      ))}
                    </Box>
                  )}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.categoryId} value={category.categoryId}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Subcategories</InputLabel>
                <Select
                  multiple
                  name="subcategories"
                  value={book.subcategories}
                  onChange={handleSubcategoryChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={categories.flatMap(cat => cat.subcategories).find(sub => sub.subcategoryId === value)?.name} />
                      ))}
                    </Box>
                  )}
                >
                  {categories
                    .filter((category) => book.categories.includes(category.categoryId))
                    .flatMap((category) =>
                      category.subcategories.map((subcategory) => (
                        <MenuItem key={subcategory.subcategoryId} value={subcategory.subcategoryId}>
                          {subcategory.name}
                        </MenuItem>
                      ))
                    )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={book.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                label="Price"
                name="price"
                type="number"
                value={book.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Condition</InputLabel>
                <Select
                  name="condition"
                  value={book.condition}
                  onChange={handleChange}
                >
                  <MenuItem value="Nuevo">Nuevo</MenuItem>
                  <MenuItem value="Como nuevo">Como nuevo</MenuItem>
                  <MenuItem value="Usado">Usado</MenuItem>
                  <MenuItem value="Muy usado">Muy usado</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={useUrlForImage}
                    onChange={(e) => setUseUrlForImage(e.target.checked)}
                  />
                }
                label="Use Image URL"
              />
              {useUrlForImage ? (
                <TextField
                  fullWidth
                  label="Image URL"
                  name="imageUrl"
                  value={book.imageUrl}
                  onChange={handleChange}
                />
              ) : (
                <Button
                  variant="contained"
                  component="label"
                >
                  Upload Image
                  <input
                    type="file"
                    hidden
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                </Button>
              )}
            </Grid>
            <Dialog open={isDialogOpen} onClose={() => handleDialogClose(false)}>
              <DialogTitle>Confirm Book Upload</DialogTitle>
              <DialogContent>
                <Typography>Name: {book.name}</Typography>
                <Typography>Author: {book.author}</Typography>
                <Typography>Categories: {book.categories.map(catId => categories.find(cat => cat.categoryId === catId)?.name).join(', ')}</Typography>
                <Typography>Subcategories: {book.subcategories.map(subId => categories.flatMap(cat => cat.subcategories).find(sub => sub.subcategoryId === subId)?.name).join(', ')}</Typography>
                <Typography>Description: {book.description}</Typography>
                <Typography>Price: {book.price}</Typography>
                <Typography>Condition: {book.condition}</Typography>
                {useUrlForImage && book.imageUrl ? (
                  <img src={book.imageUrl} alt="Book cover" style={{ maxWidth: '100%', marginTop: '10px' }} />
                ) : (
                  <Typography>Image File: {imageFile ? imageFile.name : 'No file selected'}</Typography>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleDialogClose(false)}>Reject</Button>
                <Button onClick={() => handleDialogClose(true)} autoFocus>
                  Accept
                </Button>
              </DialogActions>
            </Dialog>
            <Grid item xs={12}>
              <Button variant="contained" type="submit">
                Upload Book
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default UploadBook;
