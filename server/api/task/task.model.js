'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({
  summary: String,
  description: String,
  priority: Number,
  completed: Boolean,
  endDate: String
});

module.exports = mongoose.model('Task_Model', TaskSchema);
