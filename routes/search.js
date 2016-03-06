var express = require('express');
var request = require('request'); // "Request" library
var router = express.Router();

router.get('/artists/:input', function(req, res, next) {
    // Search artists whose name contains 'Love'
    spotifyApi.searchArtists(req.params.input)
        .then(function(data) {
            return (data.body)
        }, function(err) {
            return (err);
        });
});

router.get('/artists/:input', function(req, res, next) {
    // Search artists whose name contains 'Love'
    spotifyApi.searchArtists(req.params.input)
        .then(function(data) {
            return (data.body);
        }, function(err) {
            return (err);
        });
});

router.get('/tracks/:input', function(req, res, next) {
    // Search tracks whose artist's name contains 'Love'
    spotifyApi.searchTracks(req.params.input)
        .then(function(data) {
            return (data.body);
        }, function(err) {
            return (err);
        });
});


router.get('/playlists/:input', function(req, res, next) {
    // Search playlists whose name or description contains 'workout'
    spotifyApi.searchPlaylists(req.params.input)
        .then(function(data) {
            return (data.body);
        }, function(err) {
            return (err);
        });
});



module.exports = router;