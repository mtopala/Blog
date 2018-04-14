const categoryController = require('../../controllers/category');
const express = require('express');
const router = express.Router();

router.route('/category-form')
   .get((req, res, next) => 
        res.render('category/add-category', {
            
        }) 
    )
    .post((req, res, next) => categoryController
      .postCategory(req.body.name)
    )
        


router.route('/')
   .get((req, res, next) => categoryController
    .getCategories()
     .then(categories => {
        res.render('category/categories',{
            'categoryList': categories
         })
      })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
 )

 router.route('/:name')
    .get((req, res, next) => categoryController 
       .getArticlesByCategory(req.params.name)
          .then(articles => {
                res.render('category/articleOfCategory', {
                    articleList: articles
                })
             })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })    
     )
     
    function isLoggedIn(req, res, next) {
       if (req.isAuthenticated()){
           return next();
       }
      res.redirect('/signin'); 
    }

module.exports = router;



