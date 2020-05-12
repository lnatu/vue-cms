const express = require('express');
const AuthController = require('./../controllers/AuthController');
const UserController = require('./../controllers/UserController');
const router = express.Router();

router.post('/login', AuthController.login);
router.post('/signup', AuthController.signup);

router
  .route('/')
  .get(UserController.getAllUsers)
  .post(UserController.createUser);

router
  .route('/:id')
  .get(UserController.getUser)
  .patch(UserController.updateUser)
  .delete(
    AuthController.protect,
    AuthController.restrictTo('admin'),
    UserController.deleteUser
  );

module.exports = router;
