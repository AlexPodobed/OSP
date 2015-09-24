'use strict';

var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  mongoose = require('mongoose'),
  User = require('./user.model');

passport.use(new LocalStrategy(
  function (username, password, done) {
    console.log('RUN HERE')
    console.log(new Array(100).join("_"))
    User.findOne({username: username}, function (err, user) {
      console.log(' User.findOne')
      console.log(new Array(100).join("_"))
      if(err) return done(err);
      if(!user) {
        return done(null, false, {message: "Incorrect username"});
      }
      if(!user.validPassword(password)){
        return done(null, false, {message: "Incorrect password"});
      }

      return done(null, user);
    })
  }
));
