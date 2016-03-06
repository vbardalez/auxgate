var express = require('express');
var request = require('request'); // "Request" library
var router = express.Router();

/* GET home page. */
router.get('/searchTracks', function(req, res, next) {}
	// Search artists whose name contains 'Love'
	console.log(req.query.id);
	spotifyApi.searchArtists('Love')
	  .then(function(data) {
	    console.log('Search artists by "Love"', data.body);
	  }, function(err) {
	    console.error(err);
	  });
});

module.exports = router;
