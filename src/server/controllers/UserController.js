const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/AppError');
const catchError = require('./../utils/catchError');
const UserModel = require('./../models/UserModel');

exports.getAllUsers = catchError(async (req, res) => {
  const features = new APIFeatures(UserModel.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const users = await features.query;
  const pages = await UserModel.find(features.count()).count();

  res.status(200).json({
    status: 'success',
    results: users.length,
    pages,
    data: {
      users
    }
  });
});

exports.getUser = catchError(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    return next(new AppError(`No user found with id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.createUser = catchError(async (req, res, next) => {
  const user = await UserModel.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.updateUser = catchError(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!user) {
    return next(new AppError(`No user found with id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.deleteUser = catchError(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!user) {
    return next(new AppError(`No user found with id: ${req.params.id}`, 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
