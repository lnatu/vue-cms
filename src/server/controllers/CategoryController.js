const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/AppError');
const catchError = require('./../utils/catchError');
const CategoryModel = require('./../models/CategoryModel');

exports.getAllCategories = catchError(async (req, res, next) => {
  let searchObj = {};
  if (req.query.search) {
    searchObj = { $text: { $search: req.query.search } };
  }
  const features = new APIFeatures(CategoryModel.find(searchObj), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const categories = await features.query;
  let searchCount = features.count();
  if (req.query.search) {
    searchCount = searchObj;
  }
  const pages = await CategoryModel.find(searchCount).count();

  res.status(200).json({
    status: 'success',
    results: categories.length,
    pages,
    data: {
      categories
    }
  });
});

exports.getCategory = catchError(async (req, res, next) => {
  const category = await CategoryModel.findById(req.params.id);

  if (!category) {
    return next(
      new AppError(`No category found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      category
    }
  });
});

exports.createCategory = catchError(async (req, res, next) => {
  const category = await CategoryModel.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      category
    }
  });
});

exports.updateCategory = catchError(async (req, res, next) => {
  const category = await CategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!category) {
    return next(
      new AppError(`No category found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      category
    }
  });
});

exports.deleteCategory = catchError(async (req, res, next) => {
  const category = await CategoryModel.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    {
      new: true,
      runValidators: true
    }
  );

  if (!category) {
    return next(
      new AppError(`No category found with id: ${req.params.id}`, 404)
    );
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
