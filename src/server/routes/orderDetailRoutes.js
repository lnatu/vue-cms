const express = require('express');
const AuthController = require('./../controllers/AuthController');
const OrderDetailController = require('./../controllers/OrderDetailController');

const router = express.Router();

router.use(AuthController.protect);

router
  .route('/')
  .get(OrderDetailController.getAllOrdersDetail)
  .post(AuthController.restrictTo('admin'), OrderDetailController.createOrderDetail);

router
  .route('/:id')
  .get(OrderDetailController.getOrderDetail)
  .patch(AuthController.restrictTo('admin'), OrderDetailController.updateOrderDetail)
  .delete(AuthController.restrictTo('admin'), OrderDetailController.deleteOrderDetail);

module.exports = router;
