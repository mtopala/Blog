const homeController = require('../controllers/home');
const express = require('express');
const router = express.Router();

router.get('/', homeController.index);



module.exports = router;