const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');

// Rutas públicas (no requieren autenticación)
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/confirm/:token', userController.confirmEmail);
router.post('/reset-password', userController.requestPasswordReset);
router.post('/reset-password/:token', userController.resetPassword);

// Rutas protegidas (requieren autenticación)
router.get('/', authMiddleware, authorize('admin'), userController.getAllUsers);
router.get('/:id', authMiddleware, authorize(['admin', 'customer']), userController.getUserById);
router.put('/:id', authMiddleware, authorize(['admin', 'customer']), userController.updateUser);
router.delete('/:id', authMiddleware, authorize('admin'), userController.deleteUser);

module.exports = router;
