const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please enter your first name'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your last name'],
    trim: true
  },
  slug: String,
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'Please enter a correct email']
  },
  isShow: {
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
    default: Date.now(),
    select: false
  }
});

// Query middleware
userSchema.pre(/^find!Update$/, function(next) {
  this.find({ isShow: { $ne: false } });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
