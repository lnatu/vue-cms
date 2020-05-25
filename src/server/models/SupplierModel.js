const mongoose = require('mongoose');
const validator = require('validator');

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Supplier must has a name']
  },
  email: {
    type: String,
    required: [true, 'Please enter supplier email'],
    unique: [true, 'Email has already taken'],
    validate: [validator.isEmail, 'Please enter a correct email']
  },
  phone: {
    type: String,
    required: [true, 'Please enter supplier phone number']
  },
  address: {
    country: String,
    city: String,
    street: String,
    zip: String
  },
  isActive: {
    type: Boolean,
    default: true
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

supplierSchema.index({ '$**': 'text' });

supplierSchema.pre(/^find.*(?<!Update)$/, function(next) {
  this.find({ isActive: { $ne: false } });
  next();
});

const SupplierModel = mongoose.model('Supplier', supplierSchema);

module.exports = SupplierModel;
