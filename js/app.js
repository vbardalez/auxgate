var apiURL = "https://abc.bca";

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
  $scope.slogan = "Pass the Aux Cord";
	$scope.Description = "AuxGate is a gateway that allows the audience to get input on what song gets played";
	}]);

  app.controller('eventController', ['$scope', '$http', 'ModalFactory', function ($scope, $http, ModalFactory) {
	$scope.title = "Event";
	$scope.startEvent = function(e) {
		$http.post(apiURL, e).then(()=> {alert("Success");}, () => {alert("Failed")});
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

  $scope.updateRepo = function () {
    $http.get(apiURL).then((data)=> {$scope.playlist=data;}, () => {alert("update failed");});
  }

  $scope.addModal = function () {
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
        searchedSongs: [{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "def", votes: 3},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "def", votes: 3},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "def", votes: 3},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "deqwerf", votes: 5},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "deerqwf", votes: 2},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "dafef", votes: 1},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "dasdfef", votes: 3},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "adfdef", votes: 4},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "def", votes: 5},
  {name: "abc", artist: "def", votes: 3},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "def", votes: 3},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "def", votes: 3},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "deqwerf", votes: 5},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "deerqwf", votes: 2},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "dafef", votes: 1},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "dasdfef", votes: 3},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "adfdef", votes: 4},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "def", votes: 5},{name: "abc", artist: "def", votes: 3},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "def", votes: 3},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "def", votes: 3},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "deqwerf", votes: 5},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "deerqwf", votes: 2},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "dafef", votes: 1},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "dasdfef", votes: 3},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "adfdef", votes: 4},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
  {name: "abc", artist: "def", votes: 5}],
        close: function() {
          modal.deactivate(); 
        $timeout(function() {
          modal.destroy();
          }, 1000);
        },

        addSong: function (song) {
            $http.get(apiURL, song).then((data)=> {
            $scope.playlist=data;
            $scope.updateRepo();
          }, () => {
            alert("update failed");
          });
        },
        searchSong: function (query, searchedSongs) {
          $http.get(apiURL, query).then((data) => {
              searchedSongs=data;
          }, () => {alert("failed to search song");})
        }, 
        name: "Add a song"
      }
      });
      modal.activate();
  }

	$scope.Description = "This event is for turnups";
	$scope.playlist = { songs: [
    {name: "Sorry", artist: "Justin Bieber", duration: "3:00", votes: 4}, 
	  {name: "Love Yourself", artist: "Justin Bieber", duration: "3:00", votes: 3},
    {name: "What Do You Mean?", artist: "Justin Bieber", duration: "3:00", votes: 4}, 
	  {name: "Baby", artist: "Justin Bieber", duration: "3:00", votes: 3},
    {name: "I'll Show You", artist: "Justin Bieber", duration: "3:00", votes: 4}, 
	  {name: "Boyfriend", artist: "Justin Bieber", duration: "3:00", votes: 3},
    {name: "Never Say Never", artist: "Justin Bieber", duration: "3:00", votes: 4}, 
	  {name: "Beauty and a Beat", artist: "Justin Bieber", duration: "3:00", votes: 5},
    {name: "As Long As You Love Me", artist: "Justin Bieber", duration: "3:00", votes: 4}, 
	  {name: "The Feeling", artist: "Justin Bieber", duration: "3:00", votes: 2},
    {name: "Love Me", artist: "Justin Bieber", duration: "3:00", votes: 4}, 
	  {name: "Mark My Words", artist: "Justin Bieber", duration: "3:00", votes: 1},
    {name: "One Time", artist: "Justin Bieber", duration: "3:00", votes: 4}, 
	  {name: "One Less Lonely Girl", artist: "Justin Bieber", duration: "3:00", votes: 3},
    {name: "Life Is Worth Living", artist: "Justin Bieber", duration: "3:00", votes: 4}, 
	  {name: "No Sense", artist: "Justin Bieber", duration: "3:00", votes: 4},
    {name: "Purpose", artist: "Justin Bieber", duration: "3:00", votes: 4}, 
	  {name: "Eenie Meenie", artist: "Justin Bieber", duration: "3:00", votes: 5}], Name: "Name"};
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


