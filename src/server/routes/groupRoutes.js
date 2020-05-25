const express = require('express');
const AuthController = require('./../controllers/AuthController');
const GroupController = require('./../controllers/GroupController');

const router = express.Router();

router.use(AuthController.protect);

router
  .route('/')
  .get(GroupController.getAllGroup)
  .post(AuthController.restrictTo('admin'), GroupController.createGroup);

router
  .route('/:id')
  .get(GroupController.getGroup)
  .patch(AuthController.restrictTo('admin'), GroupController.updateGroup)
  .delete(AuthController.restrictTo('admin'), GroupController.deleteGroup);

module.exports = router;
