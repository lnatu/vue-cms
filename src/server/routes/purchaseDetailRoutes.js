const express = require('express');
const AuthController = require('./../controllers/AuthController');
const PurchaseDetailController = require('./../controllers/PurchaseDetailController');

const router = express.Router();

router.use(AuthController.protect);

router
  .route('/')
  .get(PurchaseDetailController.getAllPurchaseDetail)
  .post(
    AuthController.restrictTo('admin'),
    PurchaseDetailController.createPurchaseDetail
  );

router
  .route('/:id')
  .get(PurchaseDetailController.getPurchaseDetail)
  .patch(
    AuthController.restrictTo('admin'),
    PurchaseDetailController.updatePurchaseDetail
  )
  .delete(
    AuthController.restrictTo('admin'),
    PurchaseDetailController.deletePurchaseDetail
  );

module.exports = router;
