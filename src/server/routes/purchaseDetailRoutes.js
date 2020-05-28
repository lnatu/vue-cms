const express = require('express');
const PurchaseDetailController = require('./../controllers/PurchaseDetailController');

const router = express.Router();

router
  .route('/')
  .get(PurchaseDetailController.getAllPurchaseDetail)
  .post(PurchaseDetailController.createPurchaseDetail);

router
  .route('/:id')
  .get(PurchaseDetailController.getPurchaseDetail)
  .patch(PurchaseDetailController.updatePurchaseDetail)
  .delete(PurchaseDetailController.deletePurchaseDetail);

module.exports = router;
