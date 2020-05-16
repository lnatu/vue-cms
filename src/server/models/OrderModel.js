const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: Object,
    required: [true, 'Please enter a customer']
  },
  status: {
    type: String,
    enum: ['order success', 'packing', 'on delivery', 'delivery successful'],
    default: 'order success'
  },
  shipDate: {
    type: Date,
    required: [true, 'Please enter shipping date']
  },
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

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
