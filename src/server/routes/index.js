"use strict";

const express = require('express');
const router = express.Router();

router.use('/api', require('./api-routes'));
router.use('/', require('./web-routes'));

module.exports = router;

