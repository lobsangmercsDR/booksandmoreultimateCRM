const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subcategories: {
    type: [SubcategorySchema],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

CategorySchema.plugin(AutoIncrement, { inc_field: 'categoryId' });

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
