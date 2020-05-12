const express = require('express');
const GroupController = require('./../controllers/GroupController');

const router = express.Router();

router
  .route('/')
  .get(GroupController.getAllGroup)
  .post(GroupController.createGroup);

router
  .route('/:id')
  .get(GroupController.getGroup)
  .patch(GroupController.updateGroup)
  .delete(GroupController.deleteGroup);

module.exports = router;
