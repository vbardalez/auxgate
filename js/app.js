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
            console.log(a);
            $http.post(url, a).then((data) => {
                console.log(data);
                eventService.id = data.data.body.id;
                console.log(eventService.id);
            }, (error) => {
                console.log(error);
            })
        }
        $scope.Description = "AuxGate is a gateway that allows the audience to get input on what song gets played";
    }
]);


app.controller('eventController', ['$scope', '$http', 'ModalFactory', 'eventService',
    function($scope, $http, ModalFactory, eventService) {
        $scope.title = eventService.id;
        $scope.$watch('eventService', function() {
            $scope.title = eventService.id;
        });
        $scope.startEvent = function(e) {
            $http.post(apiURL, e).then(() => {
                alert("Success");
            }, () => {
                alert("Failed")
            });
        }

        $scope.updateRepo = function() {
            $http.get(apiURL).then((data) => {
                $scope.playlist = data;
            }, () => {
                alert("update failed");
            });
        }


        $scope.addModal = function() {
            console.log(eventService.id);
            var modal = new ModalFactory({
                // Add CSS classes to the modal
                // Can be a single string or an array of classes
                class: 'tiny dialog',
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
                        _song.votes=0;
                        console.log(_song);
                        var url = apiBaseURL + "/playlist/add-track";
                        var data = {playlistId: eventService.id,
                                    song: _song}
                        $http.post(url, data).then(() => {
                            console.log($scope.playlist);
                            $scope.playlist.songs.push(_song);
                            console.log($scope.playlist.songs);
                        }, () => {
                            alert("update failed");
                        });
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

        $scope.Description = "This event is for turnups";
        $scope.playlist = {
            songs: [],
            Name: "Name"
        };
    }
]);

config.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];

function config($urlProvider, $locationProvider, $stateProvider) {

    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
    });

    $locationProvider.hashPrefix('!');

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