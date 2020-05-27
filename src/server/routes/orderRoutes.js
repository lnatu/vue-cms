const express = require('express');
const AuthController = require('./../controllers/AuthController');
const OrderController = require('./../controllers/OrderController');

const router = express.Router();

router.use(AuthController.protect);

router
  .route('/')
  .get(OrderController.getAllOrders)
  .post(AuthController.restrictTo('admin'), OrderController.createOrder);

router
  .route('/:id')
  .get(OrderController.getOrder)
  .patch(AuthController.restrictTo('admin'), OrderController.updateOrder)
  .delete(AuthController.restrictTo('admin'), OrderController.deleteOrder);

module.exports = router;
