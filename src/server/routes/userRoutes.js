const express = require('express');
const AuthController = require('./../controllers/AuthController');
const UserController = require('./../controllers/UserController');
const router = express.Router();

router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

router.use(AuthController.protect);

router.post(
  '/signup',
  AuthController.restrictTo('admin'),
  AuthController.signup
);

router.route('/customers').get(UserController.getCustomers);

router
  .route('/')
  .get(UserController.getAllUsers)
  .post(AuthController.restrictTo('admin'), UserController.createUser);

router
  .route('/:id')
  .get(UserController.getUser)
  .patch(AuthController.restrictTo('admin'), UserController.updateUser)
  .delete(AuthController.restrictTo('admin'), UserController.deleteUser);

module.exports = router;
