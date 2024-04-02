import React from 'react';
import { Box, Grid, FormControl, InputLabel, MenuItem, Select, Button, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';

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
  filterStock,
  setFilterStock,
  filterCondition,
  setFilterCondition,
  // Añade los nuevos estados y funciones para manejarlos
}) => {
  const theme = useTheme();

  const customStyles = {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.background.paper,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginY: 2, ...customStyles }}>
      <TextField
        id="search-bar"
        label="Search book"
        variant="outlined"
        fullWidth
        margin="normal"
        value={filter}
        onChange={(event) => setFilter(event.target.value.toLowerCase())}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
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
        </Grid>
        <Grid item xs={12} md={6}>
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
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="stock-filter-label">Stock</InputLabel>
            <Select
              labelId="stock-filter-label"
              id="stock-filter"
              value={filterStock}
              label="Stock"
              onChange={(event) => setFilterStock(event.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="more">More than 5</MenuItem>
              <MenuItem value="less">Less than 5</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="condition-filter-label">Condition</InputLabel>
            <Select
              labelId="condition-filter-label"
              id="condition-filter"
              value={filterCondition}
              label="Condition"
              onChange={(event) => setFilterCondition(event.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="like new">Like New</MenuItem>
              <MenuItem value="used">Used</MenuItem>
              <MenuItem value="very used">Very Used</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button variant="outlined" onClick={applyFilters}>Apply Filters</Button>
    </Box>
  );
};

export default AdminBookFilters;
