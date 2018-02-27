const Article = require('../models/Articles');

exports.getArticleForm  = (req, res) => {
    res.render('articles/article-form', {
        title: 'Add new article'
    });
}

exports.postArticleForm = (req, res) => {
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('category', 'Category is required').notEmpty();
    req.checkBody('content', 'Content is required').notEmpty();
    
    const errors = req.validationErrors();

    if(errors) {
        console.log('Errors');
    } else {

        const article = new Article({
            title: req.body.title,
            category: req.body.category,
            content: req.body.content
        });

        article.save((err) => {
        if(err) {
            res.status(500).json({ error: err });
        }
        console.log('Article saved');
        console.log(article);
        res.redirect('/');
      });
    } 
};

exports.getArticles = (req, res) => {
    Article.find()
       .exec()
       .then(docs => {
            res.render('articles/articles', {
                'articleList': docs
            });
       })
       .catch(err => {
           res.status(500).json({
               error: err
           })
       })
};