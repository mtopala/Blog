const homeController = require('../../controllers/home');
const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res, next) => homeController
     .index()
       .then(articles => {
          res.json(articles); 
         })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
   )



module.exports = router;