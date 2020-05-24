const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
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
    group: {
      type: mongoose.Schema.ObjectId,
      ref: 'Group',
      required: [true, 'Please choose one group for user']
    },
    slug: String,
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      validate: [validator.isEmail, 'Please enter a correct email']
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minlength: [8, 'Password must has at least 8 characters'],
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function(val) {
          return this.password === val;
        },
        message: "Your passwords doesn't match"
      }
    },
    changedPasswordAt: Date,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

userSchema.index({ '$**': 'text' });

userSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'group',
    select: '-__v'
  });
  next();
});

// Query middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPassword = function(JWTTimeStamp) {
  if (this.changedPasswordAt) {
    const changedTimeStamp = parseInt(
      this.changedPasswordAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp;
  }

  return false;
};

userSchema.pre(/^find.*(?<!Update)$/, function(next) {
  this.find({ isActive: { $ne: false } });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
