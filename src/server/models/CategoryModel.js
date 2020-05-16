const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter category name']
  },
  image: String,
  isActive: {
    type: Boolean,
    default: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  deletedAt: {
    type: Date,
    select: false
  }
});

categorySchema.pre(/^find/, function(next) {
  this.find({ isActive: { $ne: false } });
  next();
});

const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
