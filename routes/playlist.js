var express = require('express');
var request = require('request'); // "Request" library
var router = express.Router();


router.post('/create', function(req, res, next) {
    spotifyApi.getMe()
        .then(function(_user) {
            var user = _user.body.id;
            spotifyApi.createPlaylist(user, req.body.Name, {
                'public': true
            })
                .then(function(data) {
                    res.json(data);
                }, function(err) {
                    res.json(err);
                });
        }, function(e) {
            res.send(e);
        });

});

router.get('/all-tracks/:id', function(req, res, next) {
    // Search artists whose name contains 'Love'
    spotifyApi.searchArtists(req.params.input)
        .then(function(data) {
            res.json(data.body);
        }, function(err) {
            res.json(err);
        });
});


router.post('/add-track', function(req, res, next) {
    // Search tracks whose artist's name contains 'Love'
    spotifyApi.getMe()
        .then(function(_user) {
            var user = _user.body.id;
            spotifyApi.addTracksToPlaylist(user, req.body.playlistId, ["spotify:track:" + req.body.song.id])
                .then(function(data) {
                    res.json(data);
                }, function(err) {
                    res.json(err);
                });
        }, function(e) {
            res.send(e);
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