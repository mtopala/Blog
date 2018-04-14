const db = require('../models/index');

const homeCtrl = {};

homeCtrl.index = () => 
     
  db.Article.findAll({
      include: [ db.User, db.Category]
  })

module.exports = homeCtrl;