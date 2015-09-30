'use strict';

var User = require('./user.model'),
    passport = require('passport');

exports.register = function (req, res, next) {
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: "Please, fill out all fields"});
  }
  var user = new User();

  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.save(function (err) {
    if(err) return next(err);
    return res.json({token: user.generateJWT()})
  });
};

exports.login = function(req, res, next){
  console.log("LOGIN:",req.body)
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: "Please, fill out all fields"});
  }
  passport.authenticate('local', function (err, user, info) {
    if(err) return next(err);
    if(user){
      return res.status(200).json({ token: user.generateJWT()})
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
};
