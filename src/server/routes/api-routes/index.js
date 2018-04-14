const express = require('express');
const router = express.Router();

router.use('/', require('./home'));
router.use('/articles', require('./article'));
router.use('/categories', require('./category'));
router.use('/comments', require('./comment'));

module.exports = router;

