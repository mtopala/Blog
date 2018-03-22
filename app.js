const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const morgan = require('morgan');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const models = require('./src/server/models');

dotenv.load({ path: '.env' });

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'src','server','public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'src','server','views'));
app.use(expressValidator());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
 

app.use(session({
  store: new SequelizeStore({
    db: models.sequelize,
    checkExpirationInterval: 15 * 60 * 1000, 
    expiration: 24 * 60 * 60 * 1000,  
    extendDefaultFields: models.extendDefaultFields
  }),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60*360000
  }
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/******Use global active user*******/
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});


//Routes
const authRoute = require('./src/server/routes/auth.js');
const homeRoute = require('./src/server/routes/home');
const articleRoutes = require('./src/server/routes/article');
const categoryRoutes = require('./src/server/routes/category');


app.use('/',homeRoute);
app.use(authRoute);
app.use('/articles',articleRoutes);
app.use('/categories',categoryRoutes);



/* Call strategy from User */
require('./src/server/config/passport')(passport,models.User);
/***************************/

/* Connect to DataBase */
models.sequelize.sync().then(function() {
 
  console.log('Nice! Database looks fine')


}).catch(function(err) {

  console.log(err, "Something went wrong with the Database Update!")

});
/**************************/

/*********Start local server****/

app.listen(3000, () => {
    console.log(' App is running at ');
    console.log('  Press CTRL-C to stop\n');
  });
/********************************/

module.exports = app;