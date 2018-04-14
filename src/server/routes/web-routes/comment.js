const commentController = require('../../controllers/comment');
const express = require('express');
const router = express.Router();

router.route('/articles/:id')
   .post((req, res, next) => commentController
     .postComment(res, req.body.comment, req.user.id, req.params.id)
   )
module.exports = router;