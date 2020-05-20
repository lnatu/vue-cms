const express = require('express');
const OrderDetailController = require('./../controllers/OrderDetailController');

const router = express.Router();

router
  .route('/')
  .get(OrderDetailController.getAllOrdersDetail)
  .post(OrderDetailController.createOrderDetail);

router
  .route('/:id')
  .get(OrderDetailController.getOrderDetail)
  .patch(OrderDetailController.updateOrderDetail)
  .delete(OrderDetailController.deleteOrderDetail);

module.exports = router;
