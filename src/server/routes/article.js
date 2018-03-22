const articleController = require('../controllers/article');
const express = require('express');
const router = express.Router();

router.get('/article-form',isLoggedIn, articleController.getArticleForm);
router.post('/article-form',isLoggedIn, articleController.postArticle);
router.get('/',isLoggedIn, articleController.getArticles);

     function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
       res.redirect('/signin'); 
    }

module.exports = router;
