var express = require('express');
var request = require('request'); // "Request" library
var querystring = require('querystring');
var SpotifyWebApi = require('spotify-web-api-node');

var router = express.Router();

var stateKey = 'spotify_auth_state';

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

router.get('/login', function(req, res) {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scopes = ['user-read-private', 'user-read-email', 'playlist-modify', 'playlist-modify-private', 'playlist-modify-public' , 'playlist-read-collaborative' , 'playlist-read-private'];

    var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

    res.redirect(authorizeURL);
});


router.get('/callback', function(req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;

    console.log(code);

    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {

        res.clearCookie(stateKey);

        spotifyApi.authorizationCodeGrant(code)
            .then(function(data) {
                console.log('The token expires in ' + data.body['expires_in']);
                console.log('The access token is ' + data.body['access_token']);
                console.log('The refresh token is ' + data.body['refresh_token']);

                // Set the access token on the API object to use it in later calls
                spotifyApi.setAccessToken(data.body['access_token']);
                spotifyApi.setRefreshToken(data.body['refresh_token']);

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: {
                        'Authorization': 'Bearer ' + spotifyApi.getAccessToken()
                    },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function(error, response, body) {
                    console.log(body);
                });


                res.redirect('/app');
            }, function(err) {
                console.log('Something went wrong!', err);
            });
    }
});

/* GET Refresh Token. */
router.get('/refresh_token', function(req, res) {

    spotifyApi.refreshAccessToken()
        .then(function(data) {
            console.log('The access token has been refreshed!');
        }, function(err) {
            console.log('Could not refresh access token', err);
        });
});

module.exports = router;