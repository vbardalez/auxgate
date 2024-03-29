
var apiBaseURL = "http://www.auxgate.xyz";

var app = angular.module('application', [
    'ui.router',
    'ngAnimate',
    //foundation
    'foundation',
    'foundation.modal',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
]);

app.factory('eventService', function() {
    var playlist = {};
    return playlist;
});

app.controller('mainController', ['$scope', '$http', 'eventService',
    function($scope, $http, eventService) {
        $scope.title = "AuxGate";
        $scope.startEvent = function(a) {
            var url = apiBaseURL + "/playlist/create";
            $http.post(url, a).then((data) => {
                eventService.id = data.data.body.id;
            }, (error) => {
                console.log(error);
            })
        }
        $scope.slogan = "Pass the Aux Cord";
        $scope.Description = "Create an event using AuxGate and share the url to allow users to vote on their favourite songs!";
    }
]);


app.controller('eventController', ['$scope', '$http', 'ModalFactory', 'eventService',
    function($scope, $http, ModalFactory, eventService) {
        $scope.title = "Event";

        $scope.updateRepo = function() {
            var url = apiBaseURL + "/sql/getSongs"
            $http.get().then((data) => {
                $scope.playlist.songs = data;
            }, () => {
                alert("update failed");
            });
        }

        $scope.songUpvote = function(song) {

            songArr = $scope.playlist.songs;
            var url = apiBaseURL + "sql/updateSong"
            if (!$scope.playlist.songs[songArr.indexOf(song)].up && !$scope.playlist.songs[songArr.indexOf(song)].down) { // both off
              $scope.playlist.songs[songArr.indexOf(song)].votes++;
              $scope.playlist.songs[songArr.indexOf(song)].up = true;
              $scope.playlist.songs[songArr.indexOf(song)].down = false;
              //song.votes++;
            }
            else if ($scope.playlist.songs[songArr.indexOf(song)].up) { // upvote on
              $scope.playlist.songs[songArr.indexOf(song)].votes--;
              $scope.playlist.songs[songArr.indexOf(song)].up = false;
              //song.votes--;
            }
            else if ($scope.playlist.songs[songArr.indexOf(song)].down) { // downvote on
              $scope.playlist.songs[songArr.indexOf(song)].votes += 2;
              $scope.playlist.songs[songArr.indexOf(song)].up = true;
              $scope.playlist.songs[songArr.indexOf(song)].down = false;
              //song.votes+=2;
            }


              //$http.post(url, song).then( ()=> {}, () => {"error"})
          }

          $scope.songDownvote = function(song) {

            songArr = $scope.playlist.songs;

            if (!$scope.playlist.songs[songArr.indexOf(song)].up && !$scope.playlist.songs[songArr.indexOf(song)].down) { // both off
              $scope.playlist.songs[songArr.indexOf(song)].votes--;
              $scope.playlist.songs[songArr.indexOf(song)].up = false;
              $scope.playlist.songs[songArr.indexOf(song)].down = true;
              //song.votes++;
            }
            else if ($scope.playlist.songs[songArr.indexOf(song)].down) { // downvote on
              $scope.playlist.songs[songArr.indexOf(song)].votes++;
              $scope.playlist.songs[songArr.indexOf(song)].down = false;
              //song.votes++;
            }
            else if ($scope.playlist.songs[songArr.indexOf(song)].up) { // upvote on
              $scope.playlist.songs[songArr.indexOf(song)].votes -= 2;
              $scope.playlist.songs[songArr.indexOf(song)].down = true;
              $scope.playlist.songs[songArr.indexOf(song)].up = false;
              //song.votes-=2;
            }
              //$http.post(url, song).then( ()=> {}, () => {"error"})
          }

        $scope.addModal = function() {

            var modal = new ModalFactory({
                // Add CSS classes to the modal
                // Can be a single string or an array of classes
                class: 'medium dialog modalHeight',
                // Set if the modal has a background overlay
                overlay: true,
                // Set if the modal can be closed by clicking on the overlay
                overlayClose: false,
                // Define a template to use for the modal
                templateUrl: 'templates/addsong.html',
                // Allows you to pass in properties to the scope of the modal
                contentScope: {
                    searchedSongs: [],
                    close: function() {
                        modal.deactivate();
                        $timeout(function() {
                            modal.destroy();
                        }, 1000);
                    },
                    addSong: function(_song) {
                        _song.votes = 0;
                        var url = apiBaseURL + "/playlist/add-track";
                        var sqlurl = apiBaseURL + "/sql/addSong";
                        var data = {
                            playlistId: eventService.id,
                            song: _song
                        }
                        var sqldata = {
                            playlistId: eventService.id,
                            trackId: _song.id
                        }
                        $http.post(url, data).then(() => {
                            //$http.post(sqlurl, sqldata).then(() => {
                                $scope.playlist.songs.push(_song);
                            //}, () => {
                            //    alert("update failed");
                            }
                        , () => {
                            alert("update failed");
                        });/*
                        $http.post(sqlurl, sqldata).then(() => {
                            }, () => {
                                alert("update failed");
                            }); */
                    },
                    searchSong: function(query, searchedSongs) {
                        var url = apiBaseURL + "/search/tracks/" + query;
                        $http.get(url).then((data) => {
                            searchedSongs.splice(0, searchedSongs.length);
                            data.data.tracks.items.forEach((value) => {
                                searchedSongs.push(value);
                            });
                        }, () => {
                            alert("failed to search song");
                        })
                    },

                    name: "Add a song"
                }
            });
            modal.activate();
        }

        $scope.title = "Friday Night Banger";
        $scope.Description = "Welcome to our event!";
        $scope.playlist = {
            songs: [],
            Name: "Name"
        };

        $scope.ms_to_min_sec = function(ms) {
            var secondsStr = "" + parseInt(ms/1000);
            return (parseInt(ms/60000) + ":" + secondsStr.substring(0,2));
        };
    }
]);

config.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];

function config($urlProvider, $locationProvider, $stateProvider) {

    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
    });


    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "templates/home.html",
            controller: 'mainController'
        })
        .state('event', {
            url: "/event",
            templateUrl: "templates/event.html",
            controller: 'eventController'
        });

    $urlProvider.otherwise('home');
}

function run() {
    FastClick.attach(document.body);
}
app.config(config)
    .run(run);
    
