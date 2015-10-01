'use strict';

var User = require('./user.model'),
    passport = require('passport');

exports.register = function (req, res, next) {
  console.log(1)
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: "Please, fill out all fields"});
  }
  var user = new User();

  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.save(function (err) {
    console.log(2, err)
    // TODO: figure out why next is not fired
    if(err) {
      return res.status(400).json({ message: "This username is already exist" });
    }
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
