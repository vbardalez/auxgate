var express = require('express');
var request = require('request'); // "Request" library
var router = express.Router();
var uuid = require('node-uuid');

var Request = require('tedious').Request
var TYPES = require('tedious').TYPES;

router.post('/addSong', function(req, res, next) {

    request = new Request("INSERT dbo.Tracks (AuxGateTrackId, SpotifyTrackId, TotalVotes, PlaylistId) OUTPUT INSERTED.AuxGateTrackId VALUES (@AuxGateTrackId, @SpotifyTrackId, @TotalVotes, @PlaylistId);", function(err) {
        if (err) {
            console.log(err);
        }
    });
    request.addParameter('AuxGateTrackId', TYPES.UniqueIdentifier, uuid.v4());
    request.addParameter('SpotifyTrackId', TYPES.NVarChar, req.body.trackId);
    request.addParameter('TotalVotes', TYPES.Int, 0);
    request.addParameter('PlaylistId', TYPES.NVarChar, req.body.playlistId);
    request.on('done', function(rowCount, more, rows) {
        res.json(rows);
    });
    connection.execSql(request);
});

router.post('/updateSong', function(req, res, next) {

    request = new Request("UPDATE dbo.Tracks SET TotalVotes = @newTotal", function(err) {
        if (err) {
            console.log(err);
        }
    });
    request.addParameter('newTotal', TYPES.Int, 0);

    connection.execSql(request);
});

router.post('/getSongs', function(req, res, next) {

    request = new Request("SELECT c.SpotifyTrackId, c.TotalVotes FROM dbo.Tracks AS c WHERE c.PlaylistId = @PlaylistId ;", function(err) {
        if (err) {
            console.log(err);
        }
    });
    request.addParameter('PlaylistId', TYPES.NVarChar, req.body.playlistId);
    request.on('done', function(rowCount, more, rows) {
        res.json(rows);
    });
    connection.execSql(request);
});

module.exports = router;