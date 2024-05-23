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

// Obtener todos los libros
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un libro por su ID incremental
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ bookId: id });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un libro
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
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

    const updatedBook = await Book.findOneAndUpdate(
      { bookId: id },
      {
        title,
        author,
        categories: categoryDocs.map(c => ({ id: c.categoryId, name: c.name })),
        subcategories: subcategoryDocs.map(s => ({ id: s.subcategoryId, name: s.name })),
        description,
        price,
        condition,
        image,
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Error al actualizar el libro:', error);
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un libro
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findOneAndDelete({ bookId: id });
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
