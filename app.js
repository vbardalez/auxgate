var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var callback = require('./routes/callback');
var refresh_token = require('./routes/refresh_token');

client_id = 'f35c748829ad4a7382b163a38c307d3e'; // Your client id
client_secret = '17c0f4df8c9e47adbcb11235fe58d963'; // Your client secret
//redirect_uri = 'http://www.auxgate.xyz/callback'; // Your redirect uri
redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri
stateKey = 'spotify_auth_state';
  
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/callback', callback);
app.use('/refresh_token', refresh_token);

console.log('Listening on 8888');
app.listen(8888);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.
      message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
