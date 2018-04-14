const articleController = require('../../controllers/article');
const express = require('express');
const router = express.Router();

router.route('/')
.get((req, res, next) => articleController
  .getArticles()
    .then(article => {
        res.json(article);
      })
     .catch(err => {
        console.log(err);
    })
)

router.route('/article-form')
  .get((req, res, next) =>  articleController
      .getArticleForm()
       .then(categories => {
           res.json(categories);
        })
        .catch(err => {
            console.log(err);
        })
    )
  
  .post((req, res, next) => articleController
    .postArticle(res, req.body.title, req.body.content, req.body.category, req.user.id)
      
   )

router.route('/:id')
   .get((req, res, next) => articleController
     .getArticleById(req.params.id)
      .then(article => {
         res.json(article);
        })
         .catch(err => {
            res.status(500).json({
             error: err
            })
          })
   )


module.exports = router;
