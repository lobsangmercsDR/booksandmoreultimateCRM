const express = require('express');
const router = express.Router();
const bookController = require('../controllers/booksController');
const authMiddleware = require('../middleware/authMiddleware');

// Crear un nuevo libro
router.post('/', authMiddleware, bookController.createBook);

// Obtener todos los libros


module.exports = router;
