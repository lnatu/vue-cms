const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/AppError');
const catchError = require('./../utils/catchError');
const GroupModel = require('./../models/GroupModel');

exports.getAllGroup = catchError(async (req, res, next) => {
  const features = new APIFeatures(GroupModel.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const groups = await features.query;

  res.status(200).json({
    status: 'success',
    results: groups.length,
    data: {
      groups
    }
  });
});

exports.getGroup = catchError(async (req, res, next) => {
  const group = await GroupModel.findById(req.params.id);

  if (!group) {
    return next(new AppError(`No group found with id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      group
    }
  });
});

exports.createGroup = catchError(async (req, res, next) => {
  const group = await GroupModel.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      group
    }
  });
});

exports.updateGroup = catchError(async (req, res, next) => {
  const group = await GroupModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!group) {
    return next(new AppError(`No group found with id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      group
    }
  });
});

exports.deleteGroup = catchError(async (req, res, next) => {
  const group = await GroupModel.findByIdAndDelete(req.params.id);

  if (!group) {
    return next(new AppError(`No group found with id: ${req.params.id}`, 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
