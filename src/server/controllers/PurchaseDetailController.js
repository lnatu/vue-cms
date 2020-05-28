const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/AppError');
const catchError = require('./../utils/catchError');
const PurchaseDetailModel = require('../models/PurchaseDetailModel');

exports.getAllPurchaseDetail = catchError(async (req, res, next) => {
  const features = new APIFeatures(PurchaseDetailModel.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const purchasesDetail = await features.query;

  res.status(200).json({
    status: 'success',
    results: purchasesDetail.length,
    data: {
      purchasesDetail
    }
  });
});

exports.getPurchaseDetail = catchError(async (req, res, next) => {
  const purchaseDetail = await PurchaseDetailModel.findById(req.params.id);

  if (!purchaseDetail) {
    return next(
      new AppError(`No purchase detail found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      purchaseDetail
    }
  });
});

exports.createPurchaseDetail = catchError(async (req, res, next) => {
  const purchaseDetail = await PurchaseDetailModel.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      purchaseDetail
    }
  });
});

exports.updatePurchaseDetail = catchError(async (req, res, next) => {
  const purchaseDetail = await PurchaseDetailModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!purchaseDetail) {
    return next(
      new AppError(`No order detail found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      purchaseDetail
    }
  });
});

exports.deletePurchaseDetail = catchError(async (req, res, next) => {
  const purchaseDetail = await PurchaseDetailModel.findByIdAndUpdate(
    req.params.id,
    {
      isActive: false
    }
  );

  if (!purchaseDetail) {
    return next(
      new AppError(`No order detail found with id: ${req.params.id}`, 404)
    );
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
