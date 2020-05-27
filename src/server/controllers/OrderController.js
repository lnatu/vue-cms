const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/AppError');
const catchError = require('./../utils/catchError');
const OrderModel = require('./../models/OrderModel');

exports.getAllOrders = catchError(async (req, res, next) => {
  let searchObj = {};
  if (req.query.search) {
    searchObj = { $text: { $search: req.query.search } };
  }

  const features = new APIFeatures(OrderModel.find(searchObj), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const orders = await features.query;
  let searchCount = features.count();
  if (req.query.search) {
    searchCount = searchObj;
  }
  const pages = await OrderModel.find(searchCount).count();

  res.status(200).json({
    status: 'success',
    results: orders.length,
    pages,
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
  let order = await OrderModel.create(req.body);

  order = await OrderModel.findById(order._id).populate({
    path: 'orderDetail',
    select: '-__v'
  });

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
