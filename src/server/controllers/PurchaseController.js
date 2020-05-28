const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/AppError');
const catchError = require('./../utils/catchError');
const PurchaseModel = require('./../models/PurchaseModel');

exports.getAllPurchases = catchError(async (req, res, next) => {
  let searchObj = {};
  if (req.query.search) {
    searchObj = { $text: { $search: req.query.search } };
  }

  const features = new APIFeatures(PurchaseModel.find(searchObj), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const purchases = await features.query;
  let searchCount = features.count();
  if (req.query.search) {
    searchCount = searchObj;
  }
  const pages = await PurchaseModel.find(searchCount).count();

  res.status(200).json({
    status: 'success',
    results: purchases.length,
    pages,
    data: {
      purchases
    }
  });
});

exports.getPurchase = catchError(async (req, res, next) => {
  const purchase = await PurchaseModel.findById(req.params.id);

  if (!purchase) {
    return next(new AppError(`No order found with id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      purchase
    }
  });
});

exports.createPurchase = catchError(async (req, res, next) => {
  let purchase = await PurchaseModel.create(req.body);

  /*order = await PurchaseModel.findById(order._id).populate({
    path: 'orderDetail',
    select: '-__v'
  });*/

  res.status(201).json({
    status: 'success',
    data: {
      purchase
    }
  });
});

exports.updatePurchase = catchError(async (req, res, next) => {
  const purchase = await PurchaseModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!purchase) {
    return next(
      new AppError(`No purchase found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      purchase
    }
  });
});

exports.deletePurchase = catchError(async (req, res, next) => {
  const purchase = await PurchaseModel.findByIdAndUpdate(req.params.id, {
    isActive: false
  });

  if (!purchase) {
    return next(
      new AppError(`No purchase found with id: ${req.params.id}`, 404)
    );
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
