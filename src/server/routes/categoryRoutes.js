const express = require('express');
const AuthController = require('./../controllers/AuthController');
const CategoryController = require('./../controllers/CategoryController');

const router = express.Router();

router.use(AuthController.protect);

router
  .route('/')
  .get(CategoryController.getAllCategories)
  .post(AuthController.restrictTo('admin'), CategoryController.createCategory);

router
  .route('/:id')
  .get(CategoryController.getCategory)
  .patch(AuthController.restrictTo('admin'), CategoryController.updateCategory)
  .delete(
    AuthController.restrictTo('admin'),
    CategoryController.deleteCategory
  );

module.exports = router;
