const express = require('express');
const CategoryController = require('./../controllers/CategoryController');

const router = express.Router();

router
  .route('/')
  .get(CategoryController.getAllCategories)
  .post(CategoryController.createCategory);

router
  .route('/:id')
  .get(CategoryController.getCategory)
  .patch(CategoryController.updateCategory)
  .delete(CategoryController.deleteCategory);

module.exports = router;
