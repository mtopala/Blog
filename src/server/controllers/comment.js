const db = require('../models/index');
const commentMethods = {};


commentMethods.postComment = (res, comment, userId, articleId) => 

        db.sequelize.sync()
        .then(() => {
         db.Comment.create({
               comment: comment,
               UserId: userId,
               ArticleId: articleId
             })
         res.redirect('/articles/' + articleId);
       })
       .catch(err => {
          console.log('In comment' + err);
       });   

module.exports = commentMethods;