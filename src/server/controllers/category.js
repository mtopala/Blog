const db = require('../models/index');
const categoryMethods = {};

categoryMethods.getCategoryForm = (req, res) => {
    res.render('category/add-category', {
       'title': 'Some title' 
    }) 
}

categoryMethods.createCategories = (req, res) => {

    req.checkBody('name', 'Name is required').notEmpty();  
    const errors = req.validationErrors();

    console.log(req.body.name);

    if(errors)
    {
        console.log('Categories Errors');

    } else {
     db.sequelize.sync()
       .then(() => {
        db.Category.create({
              name: req.body.name
            })
      })
      .catch(err => {
         console.log(err);
      }) 
      res.redirect('/');
    }
   
}

categoryMethods.getCategories = (req, res) => {
    db.Category.findAll()
    .then(categories => {
         res.json(categories);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
};

categoryMethods.getArticlesByCategory = (req, res) => {
  
    const id = req.params.id;

    db.Article.findAll({
        where: {
            CategoryId: id
        }
    })
       .then(articles => {
            res.json(articles);
       })
       .catch(err => {
           res.status(500).json({
               error: err
           })
       })
};

categoryMethods.deleteCategories = (req, res) => {
   db.Category.findOne({
       where: {
           'name': req.body.name
       }
   }).complete((err, category) => {
       if(err) {
           console.log(err);
       }
       if(category) {
           category.updateAttributes({
               'name': req.body.name
           }).success(category => {
              return category;
           })
       }
   });
}

module.exports = categoryMethods;
