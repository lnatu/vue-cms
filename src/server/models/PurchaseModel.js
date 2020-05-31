const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please specify purchase creator']
    },
    purchaseDetail: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'PurchaseDetail',
        required: [true, 'Please specify purchase creator']
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

purchaseSchema.index({ '$**': 'text' });

purchaseSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'purchaseDetail',
    select: '-__v'
  }).populate({
    path: 'createdBy',
    select: '-__v'
  });
  next();
});

purchaseSchema.virtual('totalPrice').get(function() {
  let total = 0;
  this.purchaseDetail.forEach(purchase => {
    total += purchase.product.price * purchase.quantity;
  });

  return total;
});

purchaseSchema.pre(/^find.*(?<!Update)$/, function(next) {
  this.find({ isActive: { $ne: false } });
  next();
});

const PurchaseModel = mongoose.model('Purchase', purchaseSchema);

module.exports = PurchaseModel;
