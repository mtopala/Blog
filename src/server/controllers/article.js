const db = require('../models/index');

const articleMethods = {};

articleMethods.getArticleForm  = (req, res) => {

db.Category.findAll()
    .then(categories => {
         res.render('articles/article-form', {
             'categoriesList': categories
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    }) 
}


articleMethods.postArticle= (req, res) => {
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('content', 'Content is required').notEmpty();
    req.checkBody('category', 'Category is required').notEmpty();
    
    const errors = req.validationErrors();
    if(errors) {
        console.log('Articles Errors');
    } else {
        db.sequelize.sync()
        .then(() => {
           db.Article.create({
               title: req.body.title,
               content: req.body.content,
               CategoryId: req.body.category,
               UserId: req.user.id
               })
         }) 
         .catch(err => {
            console.log(err);
         })
         res.redirect('/');
    } 
};

articleMethods.getArticles = (req, res) => {

    db.Article.findAll()
       .then(articles => {
            res.json(articles);
       })
       .catch(err => {
           res.status(500).json({
               error: err
           })
       })
};

module.exports = articleMethods;