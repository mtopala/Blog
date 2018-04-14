const db = require('../models/index');

const auth = {};

auth.signup = (req, res) => {
    res.render('account/signup');
}
 
auth.signin = (req, res) => {
    res.render('account/signin');
 
}
 
auth.dashboard = (req, res) => {

    res.render('account/dashboard', {
        user: req.user
    }); 
  
}

auth.logout = (req, res) => {
    req.logout();
    res.redirect('/');
 
}



module.exports = auth;