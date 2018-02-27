const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
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
const auth = require('./controllers/AuthController.js');

// Express configuration
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// Set Static
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', auth.home);
app.get('/register', auth.register);
app.post('/register', auth.doRegister);
app.get('/login', auth.login);
app.post('/login', auth.doLogin);
app.get('/logout', auth.logout);

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