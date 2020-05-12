const express = require('express');
const SupplierController = require('./../controllers/SupplierController');
const router = express.Router();

router
  .route('/')
  .post(SupplierController.createSupplier)
  .get(SupplierController.getAllSuppliers);

router
  .route('/:id')
  .get(SupplierController.getSupplier)
  .patch(SupplierController.updateSupplier)
  .delete(SupplierController.deleteSupplier);

module.exports = router;
