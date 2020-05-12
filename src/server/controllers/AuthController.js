const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/AppError');
const catchError = require('./../utils/catchError');
const UserModel = require('./../models/UserModel');

const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

exports.signup = catchError(async (req, res, next) => {
  const input = req.body;

  const user = await UserModel.create({
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    password: input.password,
    passwordConfirm: input.passwordConfirm,
    passwordChangedAt: input.passwordChangedAt,
    role: input.role,
    isActive: input.isActive
  });

  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
});

exports.login = catchError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please enter email and password', 400));
  }

  const user = await UserModel.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token
  });
});

exports.protect = catchError(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Please login to continue', 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await UserModel.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError('User not exists', 401));
  }

  if (currentUser.changedPassword(decoded.iat)) {
    return next(
      new AppError('User recently changed password. Please login again', 401)
    );
  }

  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};
