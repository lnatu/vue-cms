const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Order must have a customer']
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please specify order creator']
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
    orderDetail: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'OrderDetail',
        required: [true, 'Order must have order detail']
      }
    ],
    isActive: {
      type: Boolean,
      default: true,
      select: false
    },
    createdAt: {
      type: Date,
      default: Date.now()
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

orderSchema.virtual('totalPrice').get(function() {
  let total = 0;
  this.orderDetail.forEach(order => {
    total += order.product.price * order.quantity;
  });

  return total;
});

orderSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'orderDetail',
    select: '-__v'
  }).populate({
    path: 'customer',
    select: '-__v'
  }).populate({
    path: 'createdBy',
    select: '-__v'
  });
  next();
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
