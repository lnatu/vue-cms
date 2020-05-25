const express = require('express');
const AuthController = require('./../controllers/AuthController');
const SupplierController = require('./../controllers/SupplierController');

const router = express.Router();

router.use(AuthController.protect);

router
  .route('/')
  .post(AuthController.restrictTo('admin'), SupplierController.createSupplier)
  .get(SupplierController.getAllSuppliers);

router
  .route('/:id')
  .get(SupplierController.getSupplier)
  .patch(AuthController.restrictTo('admin'), SupplierController.updateSupplier)
  .delete(
    AuthController.restrictTo('admin'),
    SupplierController.deleteSupplier
  );

module.exports = router;
