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
  role: {
    type: String,
    default: 'user'
  },
  slug: String,
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'Please enter a correct email']
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

// Query middleware
userSchema.pre(/^find!Update$/, function(next) {
  this.find({ isActive: { $ne: false } });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
