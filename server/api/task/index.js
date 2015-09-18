'use strict';

var express = require('express');
var controller = require('./task.controller');

var router = express.Router();

router.get('/',    controller.index);
router.get('/:id', controller.show);
router.post('/',   controller.create);
router.put('/:id', controller.update);
router.post('/complete/:id', controller.markAsComplete);

module.exports = router;
