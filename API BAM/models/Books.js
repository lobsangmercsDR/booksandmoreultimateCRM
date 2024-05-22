const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CategoryRefSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
});

const SubcategoryRefSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
});

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  categories: [CategoryRefSchema],
  subcategories: [SubcategoryRefSchema],
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    enum: ['Nuevo', 'Como nuevo', 'Usado', 'Muy usado'],
    required: true,
    default: 'Usado',
  },
  image: {
    type: String,
    required: true,
  },
});

BookSchema.plugin(AutoIncrement, { inc_field: 'bookId' });

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
