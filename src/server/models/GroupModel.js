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
  isActive: {
    type: Boolean,
    default: true
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

groupSchema.index({ '$**': 'text' });

groupSchema.pre(/^find.*(?<!Update)$/, function(next) {
  this.find({ isActive: { $ne: false } });
  next();
});

const GroupModel = mongoose.model('Group', groupSchema);

module.exports = GroupModel;
