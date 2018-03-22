const db = require('../models/index');

const homeCtrl = {};

homeCtrl.index = (req, res) => {

  db.Article.findAll()
  .then(articles => {
       res.render('index', {
           user: req.user,
           'articleList': articles
       });
  })
  .catch(err => {
      res.status(500).json({
          error: err
      })
  })

}

module.exports = homeCtrl;