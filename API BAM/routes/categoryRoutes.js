const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { expressjwt: expressJwt } = require('express-jwt');

// Middleware de autenticación
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', authMiddleware, categoryController.updateCategory);
router.delete('/:id', authMiddleware, categoryController.deleteCategory);
router.post('/:id/subcategories', authMiddleware, categoryController.addSubcategory);
router.put('/:id/subcategories/:subcategoryId', authMiddleware, categoryController.updateSubcategory);
router.delete('/:id/subcategories/:subcategoryId', authMiddleware, categoryController.deleteSubcategory);

module.exports = router;
