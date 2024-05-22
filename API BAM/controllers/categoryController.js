const Category = require('../models/Category');

// Crear una nueva categoría
const createCategory = async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }
    const newCategory = new Category({ name, subcategories: [{ name }] });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ error: 'Category or Subcategory name already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Obtener todas las categorías
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una categoría por ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({ categoryId: req.params.id });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una categoría
const updateCategory = async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }
    const category = await Category.findOne({ categoryId: id });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    category.name = name;
    category.updatedAt = Date.now();
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ error: 'Category name already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Eliminar una categoría
const deleteCategory = async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const { id } = req.params;
    const category = await Category.findOne({ categoryId: id });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    await category.remove();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Añadir una subcategoría a una categoría
const addSubcategory = async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Subcategory name is required' });
    }
    const category = await Category.findOne({ categoryId: id });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    category.subcategories.push({ name });
    await category.save();
    const subcategory = category.subcategories[category.subcategories.length - 1];
    res.status(201).json(subcategory);
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ error: 'Subcategory name already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Actualizar una subcategoría
const updateSubcategory = async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const { id, subcategoryId } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Subcategory name is required' });
    }
    const category = await Category.findOne({ categoryId: id });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const subcategory = category.subcategories.find(sub => sub.subcategoryId === parseInt(subcategoryId));
    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }
    subcategory.name = name;
    await category.save();
    res.status(200).json(subcategory);
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ error: 'Subcategory name already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Eliminar una subcategoría de una categoría
const deleteSubcategory = async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const { id, subcategoryId } = req.params;
    const category = await Category.findOne({ categoryId: id });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const subcategory = category.subcategories.find(sub => sub.subcategoryId === parseInt(subcategoryId));
    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }
    category.subcategories.id(subcategory._id).remove();
    await category.save();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  addSubcategory,
  updateSubcategory,
  deleteSubcategory,
};
