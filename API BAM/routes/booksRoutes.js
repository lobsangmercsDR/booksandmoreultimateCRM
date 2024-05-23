const express = require('express');
const router = express.Router();
const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
} = require('../controllers/booksController');
const authMiddleware = require('../middleware/authMiddleware');

// Crear un nuevo libro
router.post('/', authMiddleware, createBook);

// Obtener todos los libros
router.get('/', getAllBooks);

// Obtener un libro por su ID incremental
router.get('/:id', getBookById);

// Actualizar un libro
router.put('/:id', authMiddleware, updateBook);

// Eliminar un libro
router.delete('/:id', authMiddleware, deleteBook);

module.exports = router;
