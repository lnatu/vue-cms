const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/AppError');
const catchError = require('./../utils/catchError');
const OrderDetailModel = require('../models/OrderDetailModel');

exports.getAllOrdersDetail = catchError(async (req, res, next) => {
  const features = new APIFeatures(OrderDetailModel.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const ordersDetail = await features.query;

  res.status(200).json({
    status: 'success',
    results: ordersDetail.length,
    data: {
      ordersDetail
    }
  });
});

exports.getOrderDetail = catchError(async (req, res, next) => {
  const orderDetail = await OrderDetailModel.findById(req.params.id);

  if (!orderDetail) {
    return next(
      new AppError(`No order detail found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      orderDetail
    }
  });
});

exports.createOrderDetail = catchError(async (req, res, next) => {
  const orderDetail = await OrderDetailModel.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      orderDetail
    }
  });
});

exports.updateOrderDetail = catchError(async (req, res, next) => {
  const orderDetail = await OrderDetailModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!orderDetail) {
    return next(
      new AppError(`No order detail found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      orderDetail
    }
  });
});

exports.deleteOrderDetail = catchError(async (req, res, next) => {
  const orderDetail = await OrderDetailModel.findByIdAndDelete(req.params.id);

  if (!orderDetail) {
    return next(
      new AppError(`No order detail found with id: ${req.params.id}`, 404)
    );
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
