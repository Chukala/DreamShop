var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var createHash = require('hash-generator');

var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

require('./config/mongoDB')();
 // autoconnect to database
require('./config/passport');

//require('./config/configAuth');

var indexRouter = require('./routes');
var productsRouter = require('./routes/products');
var adminRouter = require('./routes/admin');
var userRouter = require('./routes/user');

const RateLimit = require("express-rate-limit");

var app = express();


// view engine setup
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'views/partials/')]);
app.set('view engine', 'ejs');

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 200 // limit each IP to 350 requests per windowMs
});

app.use(limiter);
app.use(cookieParser());

// set to true if yount to store session on database

app.use(session({
  name: "sessionid",
  secret: createHash(32),
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {
  maxAge: 300000,// 4min min*sec*millisec(min*60*1000)
  httpOnly: false
  }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());


app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});



app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/products', productsRouter);
app.use('/', indexRouter);

app.use(function (err, req, res, next) {
  console.log(err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
