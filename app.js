var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var nib = require('nib');
var imagePlaceholder = require('img-placeholder');
var passport = require('passport');
var session = require('express-session');

//conect to the base
mongoose.connect('mongodb://localhost:27017/local');

var api = require('./routes/api');
var routes = require('./routes/index');
var oauth2 = require('./routes/oauth2');

var app = express();

// view engine setup
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
    .set('compress', true);
    //.import('nib');
}

app.use( stylus.middleware({
  src: __dirname + '/public/css',
  dest: __dirname + '/public/css',
  compile: compile,
  debug: true,
  force: true
}) );

//http://localost/genimg/100x400.png
app.use( imagePlaceholder({
  maxWidth : 10000,
  maxHeight : 10000,
  backgroundStyle : '#AFD7FF',
  textStyle : '#FFF',
  fontSizeParam : 6
}) );

// Use express session support since OAuth2orize requires it
app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

// Use the passport package in our application
app.use(passport.initialize());

//app.use( express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use( favicon(path.join(__dirname, 'public/img', 'favicon.ico')) );
app.use( logger('dev') );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( cookieParser() );
app.use( express.static(path.join(__dirname, 'public')) );
app.use( express.static(path.join(__dirname, 'bower_components')) );

app.use( '/api', api );
app.use( '/oauth2', oauth2 );
app.use( '/', routes );

// catch 404 and forward to error handler

app.use( function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
} );

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use( function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
      
    });
  } ).locals.pretty = true;
}

// production error handler
// no stacktraces leaked to user
app.use( function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
} );


module.exports = app;
