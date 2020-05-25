const APIFeatures = require('./../utils/APIFeatures');
const AppError = require('./../utils/AppError');
const catchError = require('./../utils/catchError');
const SupplierModel = require('./../models/SupplierModel');

exports.getAllSuppliers = catchError(async (req, res, next) => {
  let searchObj = {};
  if (req.query.search) {
    searchObj = { $text: { $search: req.query.search } };
  }
  const features = new APIFeatures(SupplierModel.find(searchObj), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const suppliers = await features.query;
  let searchCount = features.count();
  if (req.query.search) {
    searchCount = searchObj;
  }
  const pages = await SupplierModel.find(searchCount).count();

  res.status(200).json({
    status: 'success',
    results: suppliers.length,
    pages,
    data: {
      suppliers
    }
  });
});

exports.getSupplier = catchError(async (req, res, next) => {
  const supplier = await SupplierModel.findById(req.params.id);

  if (!supplier) {
    return next(
      new AppError(`No supplier found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      supplier
    }
  });
});

exports.createSupplier = catchError(async (req, res, next) => {
  const supplier = await SupplierModel.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      supplier
    }
  });
});

exports.updateSupplier = catchError(async (req, res, next) => {
  const supplier = await SupplierModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!supplier) {
    return next(
      new AppError(`No supplier found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      supplier
    }
  });
});

exports.deleteSupplier = catchError(async (req, res, next) => {
  const supplier = await SupplierModel.findByIdAndUpdate(req.params.id, {
    isActive: false
  });

  if (!supplier) {
    return next(
      new AppError(`No supplier found with id: ${req.params.id}`, 404)
    );
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
