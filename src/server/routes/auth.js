const authController = require('../controllers/auth');

module.exports = function(route, passport) {
    
    route.get('/dashboard',isLoggedIn, authController.dashboard);

    route.get('/signup', authController.signup);
 
    route.get('/signin', authController.signin);
 
    route.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
 
            failureRedirect: '/signup'
        }
    ));

    route.get('/logout',authController.logout);

    route.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',

        failureRedirect: '/signin'
    }

    ));

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
    res.redirect('/signin'); 
    }

}