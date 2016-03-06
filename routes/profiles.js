var express = require('express');
var request = require('request'); // "Request" library
var router = express.Router();

/* GET home page. */
router.get('/me', function(req, res, next) {
	request.get('https://api.spotify.com/v1/me', {
		'auth': {
    		'bearer': 'bearerToken'
  		}
	}
});

module.exports = router;
