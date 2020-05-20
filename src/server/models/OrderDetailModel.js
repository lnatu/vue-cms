const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Please enter some product']
  },
  quantity: {
    type: Number,
    min: [1, 'Product quantity must be greater than 0'],
    required: [true, 'Please enter quantity']
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

orderDetailSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'product',
    select: '-__v'
  });
  next();
});

const OrderDetailModel = mongoose.model('OrderDetail', orderDetailSchema);

module.exports = OrderDetailModel;
