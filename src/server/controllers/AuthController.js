const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/AppError');
const catchError = require('./../utils/catchError');
const UserModel = require('./../models/UserModel');

const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

const createSendToken = (user, statusCode, res) => {
  const env = process.env.NODE_ENV.trim();
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (env === 'production') {
    cookieOptions.secure = true;
  }

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = catchError(async (req, res, next) => {
  const input = req.body;

  const user = await UserModel.create({
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    password: input.password,
    passwordConfirm: input.passwordConfirm,
    passwordChangedAt: input.passwordChangedAt,
    group: input.group,
    isActive: input.isActive
  });

  createSendToken(user, 201, res);
});

exports.isLoggedIn = catchError(async (req, res, next) => {
  if (req.cookies.jwt) {
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );

    const currentUser = await UserModel.findById(decoded.id);

    if (!currentUser) {
      return next();
    }

    if (currentUser.changedPassword(decoded.iat)) {
      return next();
    }

    res.locals.user = currentUser;
    next();
  }
  next();
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

  createSendToken(user, 201, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'logged-out', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({ status: 'success' });
};

exports.protect = catchError(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
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
    const groupRoles = req.user.group.roles;
    let checkRole = false;
    for (let i = 0; i < roles.length; i++) {
      if (roles.includes(checkRole[i])) {
        checkRole = true;
        break;
      }
    }
    if (checkRole) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};
