const authController = require('../../controllers/auth');
const login = require('../../config/handler');
const express = require('express');
const passport = require('passport');
const router = express.Router();

    router.get('/dashboard',login, authController.dashboard);

    router.get('/signup', authController.signup);
 
    router.get('/signin', authController.signin);
 
    router.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
 
            failureRedirect: '/signup'
        }
    ));

    router.get('/logout',authController.logout);

    router.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',

        failureRedirect: '/signin'
    }

    ));


module.exports = router;