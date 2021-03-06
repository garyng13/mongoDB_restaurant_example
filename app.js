var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var Dishes = require('./models/dishes');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');
const url = config.mongoUrl;

//const url = "mongodb://localhost:27017/";

var connect = mongoose.connect(url);

connect.then((db)=>{
  console.log("the mongoose server is connected")},
 (err)=>{console.log(err);}
);

var app = express();
//app.use(cookieParser('1234567890'));

/*app.use(session({
  name: "session-id",
  saveUninitialized: false,
  resave: false,
  store: new FileStore(),
  secret: "1234567890"
}))*/

app.use(passport.initialize());
//app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
/*
function auth(req,res,next){
  console.log(req.user);

  if(!req.user){
 
    var err = new Error("you are not autheticated");
    err.status = 403;
    next(err);
      }
  else{
      next();
  }  
}

app.use(auth);*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);

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
