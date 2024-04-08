import { useState } from 'react';
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
} from '@mui/material';
import { useDarkmode } from '../../../context/DarkmodeContext';
import { createTheme } from '@mui/material/styles';
import CategoryCreator from '../../Widgets/CategoryCreator';

// Categorías simuladas
const simulatedCategories = ['Novel', 'Fantasy', 'Science Fiction', 'Mystery', 'Historical Fiction', 'Non-Fiction'];

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
    description: '',
    price: '',
    condition: '',
    stock: '',
    imageUrl: '',
  });
  const [useUrlForImage, setUseUrlForImage] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleCategoryChange = (category) => {
    const categoriesUpdate = book.categories.includes(category)
      ? book.categories.filter(c => c !== category)
      : [...book.categories, category];
    setBook({ ...book, categories: categoriesUpdate });
  };
  const handleDialogClose = (confirm) => {
    setIsDialogOpen(false);
    if (confirm) {
      console.log('Book confirmed for upload:', book);
      if (!useUrlForImage) {
        console.log('Image file confirmed for upload:', imageFile);
      }
      // Aquí se debería agregar la lógica para subir el libro a donde corresponda
    }


  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDialogOpen(true);

    // Aquí se debería agregar la lógica para subir el libro a donde corresponda
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
              <Typography>Categories</Typography>
              {simulatedCategories.map((category) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={book.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      name={category}
                    />
                  }
                  label={category}
                  key={category}
                />
              ))}
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
              <TextField
                fullWidth
                required
                label="Stock"
                name="stock"
                type="number"
                value={book.stock}
                onChange={handleChange}
              />
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
                <Typography>Categories: {book.categories.join(', ')}</Typography>
                <Typography>Description: {book.description}</Typography>
                <Typography>Price: {book.price}</Typography>
                <Typography>Condition: {book.condition}</Typography>
                <Typography>Stock: {book.stock}</Typography>
                <Typography>Stock: {book.stock}</Typography>
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
