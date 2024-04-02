import { useState } from 'react';
import {
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,

  Checkbox,
  FormControlLabel,
  InputLabel,
  Box,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { useDarkmode } from '../../../context/DarkmodeContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import AdminBookFilters from '../../Widgets/AdminBooksFiltrer';

const simulatedBooks = [
  { "id": 1, "name": "One Hundred Years of Solitude", "author": "Gabriel García Márquez", "categories": "Novel, Magical Realism", "description": "A family saga that spans seven generations in the fictional city of Macondo.", "price": "20.00", "condition": "new", "stock": 5, "imageUrl": "https://covers.openlibrary.org/b/id/8121781-L.jpg" },
  { "id": 2, "name": "Don Quixote", "author": "Miguel de Cervantes", "categories": "Novel, Classic Fiction", "description": "The adventures of a nobleman who goes mad and believes he is a knight-errant.", "price": "25.00", "condition": "used", "stock": 3, "imageUrl": "https://covers.openlibrary.org/b/id/7984916-L.jpg" },
  { "id": 3, "name": "The Little Prince", "author": "Antoine de Saint-Exupéry", "categories": "Fable, Philosophy", "description": "A pilot encounters a young prince who travels from planet to planet.", "price": "15.00", "condition": "new", "stock": 10, "imageUrl": "https://covers.openlibrary.org/b/id/11146558-L.jpg" },
  { "id": 4, "name": "1984", "author": "George Orwell", "categories": "Dystopian Fiction, Science Fiction", "description": "A novel about a dystopian future where the government strictly controls people's lives.", "price": "22.00", "condition": "used", "stock": 4, "imageUrl": "https://covers.openlibrary.org/b/id/7222246-L.jpg" },
  { "id": 5, "name": "Pride and Prejudice", "author": "Jane Austen", "categories": "Novel, Romance", "description": "The story of Elizabeth Bennet and her family in 19th century England.", "price": "18.00", "condition": "new", "stock": 6, "imageUrl": "https://covers.openlibrary.org/b/id/13280865-L.jpg" },
  { "id": 6, "name": "The Hobbit", "author": "J.R.R. Tolkien", "categories": "Fantasy, Adventure", "description": "The adventure of Bilbo Baggins to win a share of the treasure guarded by the dragon Smaug.", "price": "20.00", "condition": "used", "stock": 7, "imageUrl": "https://covers.openlibrary.org/b/id/6979861-L.jpg" },
  { "id": 7, "name": "To Kill a Mockingbird", "author": "Harper Lee", "categories": "Novel, Drama", "description": "The story of a young girl in the deep South and the racial tensions in her community.", "price": "19.00", "condition": "new", "stock": 8, "imageUrl": "https://covers.openlibrary.org/b/id/7202276-L.jpg" },
  { "id": 8, "name": "The Shadow of the Wind", "author": "Carlos Ruiz Zafón", "categories": "Novel, Mystery", "description": "A young boy discovers a book that leads him on a quest through the secrets of Barcelona.", "price": "21.00", "condition": "used", "stock": 2, "imageUrl": "https://covers.openlibrary.org/b/id/8151830-L.jpg" },
  { "id": 9, "name": "Harry Potter and the Philosopher's Stone", "author": "J.K. Rowling", "categories": "Fantasy, Adventure", "description": "Young Harry Potter discovers that he is a wizard and attends the Hogwarts School of Witchcraft and Wizardry.", "price": "23.00", "condition": "new", "stock": 9, "imageUrl": "https://covers.openlibrary.org/b/id/9272274-L.jpg" },
  { "id": 10, "name": "The Name of the Wind", "author": "Patrick Rothfuss", "categories": "Fantasy, Adventure", "description": "The first-person narrative of a retired legendary magician recounting his life.", "price": "24.00", "condition": "used", "stock": 5, "imageUrl": "https://covers.openlibrary.org/b/id/7798781-L.jpg" },
  { "id": 11, "name": "The Catcher in the Rye", "author": "J.D. Salinger", "categories": "Novel, Classic Fiction", "description": "The story of a few days in the life of Holden Caulfield, a disillusioned young man.", "price": "18.50", "condition": "new", "stock": 4, "imageUrl": "https://covers.openlibrary.org/b/id/8251320-L.jpg" },
];





function AllBooks() {

  const { darkMode } = useDarkmode(); // Ahora se puede utilizar useDarkmode
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });



  const [filter, setFilter] = useState('');
  const [filterAuthor, setFilterAuthor] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [books, setBooks] = useState(simulatedBooks);
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [imageToView, setImageToView] = useState('');
  const [filterStock, setFilterStock] = useState('');
  const [filterCondition, setFilterCondition] = useState('');

  const handleImageClick = (imageUrl) => {
    setImageToView(imageUrl);
  };

  const authors = simulatedBooks.map(book => book.author).filter((value, index, self) => self.indexOf(value) === index);
  const categories = simulatedBooks.flatMap(book => book.categories.split(', ')).filter((value, index, self) => self.indexOf(value) === index);

  const applyFilters = () => {
    const filteredBooks = simulatedBooks.filter((book) =>
      (filter ? book.name.toLowerCase().includes(filter) || book.description.toLowerCase().includes(filter) : true) &&
      (filterAuthor ? book.author.includes(filterAuthor) : true) &&
      (filterCategory ? book.categories.includes(filterCategory) : true) &&
      (filterStock ? (filterStock === 'more' ? book.stock > 5 : book.stock <= 5) : true) &&
      (filterCondition ? book.condition === filterCondition : true)
    );
    setBooks(filteredBooks);
  };

  const handleOpenDialog = (book) => {
    setSelectedBook(book);
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedBook(null);
  };

  const updateBook = (field, value) => {
    setSelectedBook(prevBook => ({ ...prevBook, [field]: value }));
  };

  const handleToggleCategory = (category) => {
    const categoryIndex = selectedBook.categories.split(', ').indexOf(category);
    let newCategories = selectedBook.categories.split(', ');

    if (categoryIndex === -1) {
      newCategories.push(category);
    } else {
      newCategories.splice(categoryIndex, 1);
    }

    setSelectedBook({ ...selectedBook, categories: newCategories.join(', ') });
  };




  return (
    <ThemeProvider theme={theme}>
      <div>
        <AdminBookFilters
          filter={filter}
          setFilter={setFilter}
          filterAuthor={filterAuthor}
          setFilterAuthor={setFilterAuthor}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          applyFilters={applyFilters}
          authors={authors} // Asegúrate de definir y pasar este array
          categories={categories}
          filterStock={filterStock}
          setFilterStock={setFilterStock}
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
          />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="book table">
            <TableHead>
              <TableRow>
                <TableCell >Image</TableCell>
                <TableCell>Book Name</TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="right">Categories</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Condition</TableCell>
                <TableCell align="right">Stock</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>
                    <img
                      src={book.imageUrl}
                      alt={book.name}
                      style={{ width: 50, height: 70 }}
                      onClick={() => handleImageClick(book.imageUrl)}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">{book.name}</TableCell>
                  <TableCell align="right">{book.author}</TableCell>
                  <TableCell align="right">{book.categories}</TableCell>
                  <TableCell align="right">${book.price}</TableCell>
                  <TableCell align="right">{book.condition}</TableCell>
                  <TableCell align="right">{book.stock}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="view" onClick={() => handleOpenDialog(book)}><VisibilityIcon /></IconButton>
                    <IconButton aria-label="delete"><DeleteIcon /></IconButton>
                    {/* Implementation of other buttons as needed */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {selectedBook && (
          <Dialog open={open} onClose={handleCloseDialog} maxWidth="md" fullWidth>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                id="name"
                label="Book Name"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedBook.name || ''}
                onChange={(e) => updateBook('name', e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                margin="dense"
                id="author"
                label="Author"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedBook.author || ''}
                onChange={(e) => updateBook('author', e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <Paper style={{ padding: '20px', margin: '10px 0' }} variant="outlined">
                <Grid container spacing={2}>
                  {categories.map((category) => (
                    <Grid item xs={4} key={category}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedBook.categories.split(', ').includes(category)}
                            onChange={() => handleToggleCategory(category)}
                          />
                        }
                        label={category}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Paper>

              <TextField
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={selectedBook.description || ''}
                onChange={(e) => updateBook('description', e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                margin="dense"
                id="price"
                label="Price"
                type="number"
                fullWidth
                variant="outlined"
                value={selectedBook.price || ''}
                onChange={(e) => updateBook('price', e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="condition-label">Condition</InputLabel>
                <Select
                  labelId="condition-label"
                  id="condition"
                  value={selectedBook.condition || ''}
                  label="Condition"
                  onChange={(e) => updateBook('condition', e.target.value)}
                >
                  <MenuItem value="new">New</MenuItem>
                  <MenuItem value="like new">Like New</MenuItem>
                  <MenuItem value="used">Used</MenuItem>
                  <MenuItem value="very used">Very Used</MenuItem>
                </Select>
              </FormControl>
              <TextField
                margin="dense"
                id="stock"
                label="Stock"
                type="number"
                fullWidth
                variant="outlined"
                value={selectedBook.stock || ''}
                onChange={(e) => updateBook('stock', e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={() => {
                // Simulating book update
                const updatedBooks = books.map(book =>
                  book.id === selectedBook.id ? selectedBook : book
                );
                setBooks(updatedBooks);
                handleCloseDialog();
              }}>Save</Button>
            </DialogActions>
          </Dialog>
        )}
        {imageToView && (
          <Dialog open={Boolean(imageToView)} onClose={() => setImageToView('')}>
            <img src={imageToView} alt="Full Screen" style={{ width: '100%' }} />
          </Dialog>
        )}
      </div>
    </ThemeProvider>
  );
}

export default AllBooks;
