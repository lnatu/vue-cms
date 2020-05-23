const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter group name']
  },
  roles: {
    type: Array,
    validate: {
      validator: function(array) {
        return array.length > 0;
      },
      message: 'Please enter group role'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  deletedAt: {
    type: Date,
    select: false
  }
});

groupSchema.virtual('users', {
  ref: 'User',
  foreignField: 'group',
  localField: '_id'
});

const GroupModel = mongoose.model('Group', groupSchema);

module.exports = GroupModel;
