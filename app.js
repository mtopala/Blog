const express = require('express');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' });


const app = express();

// Connect MongoDb
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});
mongoose.connection.once('open',() => {
  console.log('Database connect succesfull');
});

// Controllers

const articleController = require('./controllers/article.js');
const homeController = require('./controllers/home.js');

// Express configuration
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

// Set Static
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.locals.errors = null;
    next();
})

// Routes
app.get('/', homeController.index);
app.get('/articles/article-form', articleController.getArticleForm );
app.post('/articles/article-form', articleController.postArticleForm);
app.get('/articles', articleController.getArticles);

// Start server
app.listen(3000, () => {
    console.log(' App is running at http://localhost:3000');
    console.log('  Press CTRL-C to stop\n');
  });
  
module.exports = app;