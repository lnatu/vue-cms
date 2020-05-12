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
  category: Object,
  supplier: Object,
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

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
