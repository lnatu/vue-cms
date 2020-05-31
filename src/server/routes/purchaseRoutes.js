const express = require('express');
const AuthController = require('./../controllers/AuthController');
const PurchaseController = require('./../controllers/PurchaseController');

const router = express.Router();

router.use(AuthController.protect);

router
  .route('/')
  .get(PurchaseController.getAllPurchases)
  .post(AuthController.restrictTo('admin'), PurchaseController.createPurchase);

router
  .route('/:id')
  .get(PurchaseController.getPurchase)
  .patch(AuthController.restrictTo('admin'), PurchaseController.updatePurchase)
  .delete(AuthController.restrictTo('admin'), PurchaseController.deletePurchase);

module.exports = router;
