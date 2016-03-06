var express = require('express');
var request = require('request'); // "Request" library
var router = express.Router();


router.post('/create', function(req, res, next) {
    // Search artists whose name contains 'Love'
    console.log(req.body);
    
    
    spotifyApi.getMe()
      .then(function(user) {
        spotifyApi.createPlaylist(user, req, { 'public' : true })
          .then(function(data) {
            var user = data;
            spotifyApi.createPlaylist(user, req.body.Name, { 'public' : true })
                  .then(function(data) {
                    res.json(data);
                  }, function(err) {
                        res.json(err);
                  });
          }, function(err) {
                res.send(err);
          });
      }, function(e) {
        res.send(e);
      });

});

router.get('/addtrack/:input', function(req, res, next) {
    // Search artists whose name contains 'Love'
    spotifyApi.searchArtists(req.params.input)
        .then(function(data) {
            res.json(data.body);
        }, function(err) {
            res.json(err);
        });
});

router.get('/tracks/:input', function(req, res, next) {
    // Search tracks whose artist's name contains 'Love'
    spotifyApi.searchTracks(req.params.input)
        .then(function(data) {
            res.json(data.body);
        }, function(err) {
            res.json(err);
        });
});


router.get('/playlists/:input', function(req, res, next) {
    // Search playlists whose name or description contains 'workout'
    spotifyApi.searchPlaylists(req.params.input)
        .then(function(data) {
            res.json(data.body);
        }, function(err) {
            res.json(err);
        });
});



module.exports = router;