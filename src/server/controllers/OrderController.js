const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/AppError');
const catchError = require('./../utils/catchError');
const OrderModel = require('./../models/OrderModel');

exports.getAllOrders = catchError(async (req, res, next) => {
  const features = new APIFeatures(OrderModel.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const orders = await features.query;

  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: {
      orders
    }
  });
});

exports.getOrder = catchError(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id);

  if (!order) {
    return next(new AppError(`No order found with id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      order
    }
  });
});

exports.createOrder = catchError(async (req, res, next) => {
  const order = await OrderModel.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      order
    }
  });
});

exports.updateOrder = catchError(async (req, res, next) => {
  const order = await OrderModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!order) {
    return next(
      new AppError(`No category found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      order
    }
  });
});

exports.deleteOrder = catchError(async (req, res, next) => {
  const order = await OrderModel.findByIdAndUpdate(req.params.id, {
    isActive: false
  });

  if (!order) {
    return next(
      new AppError(`No category found with id: ${req.params.id}`, 404)
    );
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
