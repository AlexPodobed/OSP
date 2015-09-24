/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var passport = require('passport');

require('./api/user/passport');

module.exports = function(app) {

  app.use(passport.initialize())
  // Insert routes belo
  app.use('/auth', require('./api/user'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/tasks', require('./api/task'));
  // do smng with unauthorized req
  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.send(401, {message: 'invalid token...'});
    }
  });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
