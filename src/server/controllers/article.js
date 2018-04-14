const db = require('../models/index');
const articleMethods = {};

articleMethods.getArticleForm  = () => db.Category.findAll()

articleMethods.postArticle = (res, title, content, category, userId) => 

    db.sequelize.sync()
        .then(() => {
           db.Article.create({
               title: title,
               content: content,
               CategoryId: category,
               UserId: userId
               })
            res.redirect('/articles');
         })  


articleMethods.getArticles = () => 
    db.Article.findAll({
      include: [db.User]
    })

articleMethods.getArticleById = (id) => 
     db.Article.findById(id, {
        include: [
            {
                model: db.User
            },
            {
                 model: db.Comment,
                 include: [db.User]
            }
        ],
    })

module.exports = articleMethods;