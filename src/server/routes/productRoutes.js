const express = require('express');
const ProductController = require('./../controllers/ProductController');

const router = express.Router();

router
  .route('/')
  .get(ProductController.getAllProducts)
  .post(ProductController.createProduct);

router
  .route('/:id')
  .get(ProductController.getProduct)
  .patch(ProductController.updateProduct)
  .delete(ProductController.deleteProduct);

module.exports = router;
