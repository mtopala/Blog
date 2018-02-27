const mongoose = require('mongoose');
const passport = require("passport");
const User = require('../models/Users');


exports.register = (req, res) => {
    res.render('account/register', {
        title: 'Register'
    })
}

exports.doRegister = function(req, res) {
    User.register(new User({ username : req.body.username, name: req.body.name }), req.body.password, function(err, user) {
      if (err) {
        return res.render('account/register', { user : user });
      }
  
      passport.authenticate('local')(req, res, function () {
        res.redirect('/');
      });
    });
  };

exports.login = (req, res) => {
    res.render('account/login');
};

//Post login

exports.doLogin = (req, res) => {
    passport.authenticate('local')(req, res, () => {
       res.redirect('/');
    });
}

//logout
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}