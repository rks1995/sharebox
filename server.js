const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');

//use express-session to authenticate
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJwt = require('./config/passport-jwt-strategy');

//set up multer
const multer = require('multer');

//flash
const flash = require('connect-flash');

const customMware = require('./config/middleware');

//set up mongo store to store session cookie
const MongoStore = require('connect-mongo');
const db = require('./config/mongoose');

//import sass
const sassMiddleware = require('node-sass-middleware');

const app = express();
const port = 8000;

app.use(
  sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css',
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//use express layout
app.use(expressLayout);

// extract style and script from a sub-page to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use static files
app.use(express.static('./assets'));

//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//use express-session as middleware to encrypth cookies
//mongo store setup
app.use(
  session({
    name: 'user_id',
    // TODO change the secret before deployement in production mode
    secret: 'demosecret',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost/sharebox_db',
      autoRemove: 'disabled',
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setUserAuthentication);

app.use(flash());
app.use(customMware.flashMessage);

//use express route
app.use('/', require('./route/index'));

//set avatar path
app.use('/uploads', express.static(__dirname + '/uploads'));

//start server
app.listen(port, function (err) {
  if (err) {
    console.log('error connecting server');
    return;
  }
  console.log(`server is up and running at http://localhost:${port}`);
});
