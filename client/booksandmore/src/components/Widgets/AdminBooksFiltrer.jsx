import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Button, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Asume que estos están definidos





const AdminBookFilters = ({

  filter,
  setFilter,
  filterAuthor,
  setFilterAuthor,
  filterCategory,
  setFilterCategory,
  applyFilters,
  authors,
  categories,
}) => {
  const theme = useTheme();

  const customStyles = {
    backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#fff',
    padding: theme.spacing(0),


  };

  return (


    <Box sx={{ display: 'flex', gap: 2, marginY: 2, alignItems: 'center',...customStyles }}>
      <TextField
        id="search-bar"
        label="Search book"
        variant="outlined"
        fullWidth
        margin="normal"
        value={filter}
        onChange={(event) => setFilter(event.target.value.toLowerCase())}
      />
      <FormControl fullWidth>
        <InputLabel id="author-filter-label">Author</InputLabel>
        <Select
          labelId="author-filter-label"
          id="author-filter"
          value={filterAuthor}
          label="Author"
          onChange={(event) => setFilterAuthor(event.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {authors.map((author) => (
            <MenuItem key={author} value={author}>{author}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="category-filter-label">Category</InputLabel>
        <Select
          labelId="category-filter-label"
          id="category-filter"
          value={filterCategory}
          label="Category"
          onChange={(event) => setFilterCategory(event.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="outlined" onClick={applyFilters}>Apply Filters</Button>
    </Box>

  );


  };

;








export default AdminBookFilters;
