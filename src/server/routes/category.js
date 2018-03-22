const categoryController = require('../controllers/category');
const express = require('express');
const router = express.Router();
    router.get('/category-form',isLoggedIn, categoryController.getCategoryForm);
    router.post('/category-form',isLoggedIn, categoryController.createCategories);
    router.get('/', categoryController.getCategories);
    router.get('/:id',isLoggedIn,categoryController.getArticlesByCategory);


    function isLoggedIn(req, res, next) {
       if (req.isAuthenticated()){
           return next();
       }
      res.redirect('/signin'); 
    }

module.exports = router;



