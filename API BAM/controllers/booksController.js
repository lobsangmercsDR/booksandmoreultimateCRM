const Book = require('../models/Books');
const Category = require('../models/Category');

// Crear un nuevo libro
const createBook = async (req, res) => {
  try {
    const { title, author, categories, subcategories, description, price, condition, image } = req.body;

    // Verificar que todas las categorías existan
    const categoryDocs = await Category.find({ categoryId: { $in: categories } });
    if (categoryDocs.length !== categories.length) {
      return res.status(400).json({ error: 'Invalid categories' });
    }

    // Verificar que todas las subcategorías existan
    let validSubcategories = true;
    let subcategoryDocs = [];
    for (let subcategoryId of subcategories) {
      const category = await Category.findOne({ 'subcategories.subcategoryId': subcategoryId });
      if (!category) {
        validSubcategories = false;
        break;
      } else {
        const subcategory = category.subcategories.find(sub => sub.subcategoryId === subcategoryId);
        subcategoryDocs.push(subcategory);
      }
    }
    if (!validSubcategories || subcategoryDocs.length !== subcategories.length) {
      return res.status(400).json({ error: 'Invalid subcategories' });
    }

    const newBook = new Book({
      title,
      author,
      categories: categoryDocs.map(c => ({ id: c.categoryId, name: c.name })),
      subcategories: subcategoryDocs.map(s => ({ id: s.subcategoryId, name: s.name })),
      description,
      price,
      condition,
      image,
    });

    await newBook.save();

    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error al crear el libro:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBook,
};
