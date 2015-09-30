'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({
  summary: String,
  description: String,
  priority: String,
  completed: Boolean,
  endDate: String,
  _creator: {
    type: Schema.Types.ObjectId,
    ref: "User_Model"
  }
});

module.exports = mongoose.model('Task_Model', TaskSchema);
