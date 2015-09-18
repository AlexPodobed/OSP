'use strict';

var _ = require('lodash');
var Task = require('./task.model');

// list all of tasks
exports.index = function (req, res) {
  Task.find(function (err, tasks) {
    if(err) { return handleError(res, err)}

    return res.status(200).json(tasks);
  });
};
// get single task
exports.show = function (req, res) {
  Task.findById(req.params.id, function (err, task) {
    if(err) { return handleError(res, err) }
    if(!task) { return res.status(404).send('Task not found') }
    return res.status(200).json(task);
  });
};
// create new task
exports.create = function (req, res) {
  Task.create(req.body, function (err, task) {
    if(err) { return handleError(res, err) }
    return res.status(201).json(task);
  });
};

// update existing task
exports.update = function (req, res) {
  if(req.body._id) { delete req.body._id; }

  Task.findById(req.params.id, function (err, task) {
    if(err) { return handleError(res, err) }
    if(!task) { return res.status(404).send('Task not found') }

    var updated = _.merge(task, req.body);
    updated.save(function (err) {
      if(err) { return handleError(res, err) }
      return res.status(200).json(task);
    });
  });
};

// mark as complete
exports.markAsComplete = function (req, res) {

};


function handleError(res, err) {
  return res.status(500).send(err);
}
