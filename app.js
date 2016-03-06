var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan'); 
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var SpotifyWebApi = require('spotify-web-api-node');
var Connection = require('tedious').Connection;

var config = {
    userName: 'auxgate',
    password: 'QHacks16!',
    server: 'auxgate.database.windows.net',
    // If you are on Microsoft Azure, you need this:
    options: {encrypt: true, database: 'AdventureWorks'}
};
var connection = new Connection(config);
connection.on('connect', function(err) {
// If no error, then good to proceed.
    console.log("Connected");
});

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var search = require('./routes/search');

var stateKey = 'spotify_auth_state';

var app = express();

spotifyApi = new SpotifyWebApi({
    clientId: 'f35c748829ad4a7382b163a38c307d3e',
    clientSecret: '17c0f4df8c9e47adbcb11235fe58d963',
    redirectUri: 'http://www.auxgate.xyz/auth/callback' 
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);
app.use('/search', search);

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