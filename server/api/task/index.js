'use strict';

var express = require('express');
var controller = require('./task.controller');
var jwt = require('express-jwt');
var auth = jwt({secret: "SECRET", userProperty: 'payload'});

var router = express.Router();

router.get('/',  controller.index);
router.get('/:id', auth, controller.show);
router.post('/',   controller.create);
router.put('/:id', controller.update);
router.post('/complete/:id', controller.markAsComplete);

module.exports = router;
