const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas públicas (no requieren autenticación)
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Función de middleware para aplicar authMiddleware solo a las rutas protegidas
const protectedRoutes = (req, res, next) => {
  authMiddleware(req, res, next);
};

// Rutas protegidas (requieren autenticación)
router.use(protectedRoutes);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
