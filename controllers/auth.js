const mongoose = require('mongoose');
const passport = require("passport");
const jwt = require('jsonwebtoken');
const config = require('../config/db');
require('../config/passport')(passport);
const User = require('../models/Users');

exports.getRegisterForm = (req, res) => {
    res.render('account/register', {
        title: 'Sign up'
    });
}

exports.doRegister = ((req, res) => {
    if(!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password'});

    } else {
        const newUser = new User({
            username: req.body.username, 
            password: req.body.password
        });

        // save the user

        newUser.save((err) => {
            if(err) {
                return res.json({success: false, msg: 'Username already existing!'});
            }
            res.json({success: true, msg: 'Successful created new user'});
        });
          
    }
});

//get  login form
exports.getLoginForm = (req, res) => {
    res.render('account/login', {
        title: 'Login'
    });
}

// post login

exports.doLogin =((req, res) => {
    User.findOne({
        username: req.body.username
    }, (err, user) => {
        if(err) 
           console.log(err);

        if(!user) {
            res.status(401).send({success: false, msg: 'Auth failed. User not found!'});
        } else {
            //check if pasdword matches

            user.comparePassword(req.body.password, (err, isMatch) => {
                if(isMatch && !err) {
                    // if user found and password is right create a token
                    const token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 604800
                    });

                    // return the information including token as JSON
                    //res.json({success: true, token: 'JWT' + token});
                    res.render('account/profile', {
                        user: user.username
                    })
                } else {
                    res.status(401).send({success: false, msg:'Authentication is failed.Wrong password'});;
                }
            });
        }
    });
});
