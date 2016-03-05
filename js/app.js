
  var app = angular.module('application', [
    'ui.router',
    'ngAnimate',
    //foundation
    'foundation',
    'foundation.modal',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
  ;

  app.controller('mainController', ['$scope', '$http', function ($scope, $http) {
	$scope.title = "AuxGate";
	$scope.startEvent = function(event) {
		$http.post("abc.abc", event).then(()=> {alert("Success");}, () => {alert("Failed")});
	}
	$scope.Description = "AuxGate is a gateway that allows the audience to get input on what song gets played";
	}]);

  app.controller('eventController', ['$scope', '$http', 'ModalFactory', function ($scope, $http, ModalFactory) {
	$scope.title = "Event";
	$scope.startEvent = function(event) {
		$http.post("abc.abc", event).then(()=> {alert("Success");}, () => {alert("Failed")});
	}

  $scope.songUpvote = function(song) {

    songArr = $scope.playlist.songs;

    if (!$scope.playlist.songs[songArr.indexOf(song)].up && !$scope.playlist.songs[songArr.indexOf(song)].down) { // both off
      $scope.playlist.songs[songArr.indexOf(song)].votes++;
      $scope.playlist.songs[songArr.indexOf(song)].up = true;
      $scope.playlist.songs[songArr.indexOf(song)].down = false;
    }
    else if ($scope.playlist.songs[songArr.indexOf(song)].up) { // upvote on
      $scope.playlist.songs[songArr.indexOf(song)].votes--;
      $scope.playlist.songs[songArr.indexOf(song)].up = false;
    }
    else if ($scope.playlist.songs[songArr.indexOf(song)].down) { // downvote on
      $scope.playlist.songs[songArr.indexOf(song)].votes += 2;
      $scope.playlist.songs[songArr.indexOf(song)].up = true;
      $scope.playlist.songs[songArr.indexOf(song)].down = false;
    }
  }

  $scope.songDownvote = function(song) {

    songArr = $scope.playlist.songs;

    if (!$scope.playlist.songs[songArr.indexOf(song)].up && !$scope.playlist.songs[songArr.indexOf(song)].down) { // both off
      $scope.playlist.songs[songArr.indexOf(song)].votes--;
      $scope.playlist.songs[songArr.indexOf(song)].up = false;
      $scope.playlist.songs[songArr.indexOf(song)].down = true;
    }
    else if ($scope.playlist.songs[songArr.indexOf(song)].down) { // downvote on
      $scope.playlist.songs[songArr.indexOf(song)].votes++;
      $scope.playlist.songs[songArr.indexOf(song)].down = false;
    }
    else if ($scope.playlist.songs[songArr.indexOf(song)].up) { // upvote on
      $scope.playlist.songs[songArr.indexOf(song)].votes -= 2;
      $scope.playlist.songs[songArr.indexOf(song)].down = true;
      $scope.playlist.songs[songArr.indexOf(song)].up = false;
    }
  }

  $scope.addModal = function () {
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
        close: function() {
          modal.deactivate(); 
        $timeout(function() {
          modal.destroy();
          }, 1000);
        },
        name: "Add a song"
      }
      });
      modal.activate();
  }
	$scope.Description = "This event is for turnups";
	$scope.playlist = {songs: [{name: "1", artist: "Justin Bieber", votes: 4}, 
	{name: "2", artist: "def", votes: 3},{name: "3", artist: "Justin Bieber", votes: 4}, 
	{name: "4", artist: "def", votes: 3},{name: "5", artist: "Justin Bieber", votes: 4}, 
	{name: "6", artist: "def", votes: 3},{name: "7", artist: "Justin Bieber", votes: 4}, 
	{name: "8", artist: "deqwerf", votes: 5},{name: "9", artist: "Justin Bieber", votes: 4}, 
	{name: "10", artist: "deerqwf", votes: 2},{name: "11", artist: "Justin Bieber", votes: 4}, 
	{name: "12", artist: "dafef", votes: 1},{name: "13", artist: "Justin Bieber", votes: 4}, 
	{name: "14", artist: "dasdfef", votes: 3},{name: "15", artist: "Justin Bieber", votes: 4}, 
	{name: "16", artist: "adfdef", votes: 4},{name: "17", artist: "Justin Bieber", votes: 4}, 
	{name: "18", artist: "def", votes: 5}], Name: "Name"};
	}]);

  config.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];

  function config($urlProvider, $locationProvider, $stateProvider) {

    $locationProvider.html5Mode({
      enabled:false,
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


