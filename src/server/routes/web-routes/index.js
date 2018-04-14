const express = require('express');
const login = require('../../config/handler');
const router = express.Router();

router.use('/', require('./home'));
router.use(require('./auth'));
router.use('/articles',login, require('./article'));
router.use('/categories',login, require('./category'));
router.use('/comments',login, require('./comment'));

module.exports = router;

