const db = require('../models/index');
const categoryMethods = {};

categoryMethods.postCategory = name => {
 
     db.sequelize.sync()
       .then(() => {
           db.Category.create({
              name: name.toLowerCase()
            })
      })
      .catch(err => {
         console.log(err);
      })    
}

categoryMethods.getCategories = () => db.Category.findAll()


categoryMethods.getArticlesByCategory = name => 

    db.Category.findAll({
        include: [
            {
                model: db.Article,
                include: [db.User]
            }
        ],
        where: {
            name: name
        }
    })


module.exports = categoryMethods;
