const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/AppError');
const catchError = require('./../utils/catchError');
const ProductModel = require('./../models/ProductModel');

exports.getAllProducts = catchError(async (req, res, next) => {
  let searchObj = {};
  if (req.query.search) {
    searchObj = { $text: { $search: req.query.search } };
  }
  const features = new APIFeatures(ProductModel.find(searchObj), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;
  let searchCount = features.count();
  if (req.query.search) {
    searchCount = searchObj;
  }
  const pages = await ProductModel.find(searchCount).count();

  res.status(200).json({
    status: 'success',
    results: products.length,
    pages,
    data: {
      products
    }
  });
});

exports.getProduct = catchError(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new AppError(`No product found with id: ${req.params.id}`));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product
    }
  });
});

exports.createProduct = catchError(async (req, res, next) => {
  const product = await ProductModel.create(req.body);

  res.status('201').json({
    status: 'success',
    data: {
      product
    }
  });
});

exports.updateProduct = catchError(async (req, res, next) => {
  const product = await ProductModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!product) {
    return next(new AppError(`No product found with id: ${req.params.id}`));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product
    }
  });
});

exports.deleteProduct = catchError(async (req, res, next) => {
  const product = await ProductModel.findByIdAndUpdate(req.params.id, {
    isActive: false
  });

  if (!product) {
    return next(new AppError(`No product found with id: ${req.params.id}`));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
