'use strict';

var express = require('express');
var controller = require('./task.controller');
var jwt = require('express-jwt');
var auth = jwt({secret: "SECRET", userProperty: 'payload'});

var router = express.Router();

router.get('/',  auth, controller.index);
router.get('/:id', auth, controller.show);
router.post('/',  auth, controller.create);
router.put('/:id', auth, controller.update);
router.post('/complete/:id', auth, controller.markAsComplete);

module.exports = router;
