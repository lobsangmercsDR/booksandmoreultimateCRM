const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas públicas (no requieren autenticación)
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/confirm/:token', userController.confirmEmail);
router.post('/reset-password', userController.requestPasswordReset);

// Corrección aquí
// Asumiendo que tienes implementada la función resetPassword en userController
router.post('/reset-password/:token', userController.resetPassword);

// Ruta para restablecer la contraseña

// Rutas protegidas (requieren autenticación)
router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;
