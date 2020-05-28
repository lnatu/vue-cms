const express = require('express');
const AuthController = require('./../controllers/AuthController');
const PurchaseController = require('./../controllers/PurchaseController');

const router = express.Router();

// router.use(AuthController.protect);

router
  .route('/')
  .get(PurchaseController.getAllPurchases)
  .post(PurchaseController.createPurchase);

router
  .route('/:id')
  .get(PurchaseController.getPurchase)
  .patch(PurchaseController.updatePurchase)
  .delete(PurchaseController.deletePurchase);

module.exports = router;
