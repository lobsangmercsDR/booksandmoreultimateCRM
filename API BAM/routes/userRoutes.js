const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas públicas (no requieren autenticación)
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Rutas protegidas (requieren autenticación)
router.use(authMiddleware);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;