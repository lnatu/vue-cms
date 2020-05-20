const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: [true, 'Please enter product sku']
  },
  name: {
    type: String,
    required: [true, 'Please enter product name']
  },
  description: {
    type: String,
    required: [true, 'Please enter product description']
  },
  quantity: {
    type: Number,
    min: [0, 'Please enter a valid quantity'],
    required: [true, 'Please enter product quantity']
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price']
  },
  manufactureDetails: Object,
  shippingDetail: Object,
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: [true, 'Product must has a category']
  },
  supplier: {
    type: mongoose.Schema.ObjectId,
    ref: 'Supplier',
    required: [true, 'Product must has a supplier']
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

productSchema.pre(/^find/, function(next) {
  this.populate({ path: 'supplier', select: '-__v' }).populate({
    path: 'category',
    select: '-__v'
  });
  next();
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
