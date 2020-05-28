const express = require('express');
const AuthController = require('./../controllers/AuthController');
const ProductController = require('./../controllers/ProductController');

const router = express.Router();

router.use(AuthController.protect);

router.route('/updateQuantity/:id').patch(ProductController.updateQuantity);

router
  .route('/')
  .get(ProductController.getAllProducts)
  .post(
    AuthController.restrictTo('admin', 'staff'),
    ProductController.createProduct
  );

router
  .route('/:id')
  .get(ProductController.getProduct)
  .patch(
    AuthController.restrictTo('admin', 'staff'),
    ProductController.updateProduct
  )
  .delete(
    AuthController.restrictTo('admin', 'staff'),
    ProductController.deleteProduct
  );

module.exports = router;
