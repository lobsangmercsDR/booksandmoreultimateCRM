const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subcategoryId: {
    type: Number,
    unique: true,
  },
});

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subcategories: [SubcategorySchema],
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
SubcategorySchema.plugin(AutoIncrement, { inc_field: 'subcategoryId' });

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
