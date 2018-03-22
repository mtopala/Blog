const authController = require('../controllers/auth');
const express = require('express');
const passport = require('passport');
const router = express.Router();

    const isLoggedIn = (req, res, next) => {
        if (req.isAuthenticated()){
            return next();
        }
        res.redirect('/signin'); 
    }

    router.get('/dashboard',isLoggedIn, authController.dashboard);

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