
var apiBaseURL = "http://localhost:3000";

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
	$scope.startEvent = function(a) {
          var url = apiBaseURL + "/playlist/create";
          console.log(a);
          $http.post(url, a).then((data) => {
              console.log(data);
          }, (error) => {console.log(error);})
	}
	$scope.Description = "AuxGate is a gateway that allows the audience to get input on what song gets played";
  $scope.createPlaylist = function (name) {
        }
	}]);


  app.controller('eventController', ['$scope', '$http', 'ModalFactory', function ($scope, $http, ModalFactory) {
	$scope.title = "Event";
	$scope.startEvent = function(e) {
		$http.post(apiURL, e).then(()=> {alert("Success");}, () => {alert("Failed")});
	}

  $scope.updateRepo = function () {
    $http.get(apiURL).then((data)=> {$scope.playlist=data;}, () => {alert("update failed");});
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
        searchedSongs: [{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "def", votes: 3},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "def", votes: 3},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "def", votes: 3},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "deqwerf", votes: 5},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "deerqwf", votes: 2},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "dafef", votes: 1},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "dasdfef", votes: 3},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "adfdef", votes: 4},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "def", votes: 5},
  {name: "abc", artists: "def", votes: 3},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "def", votes: 3},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "def", votes: 3},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "deqwerf", votes: 5},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "deerqwf", votes: 2},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "dafef", votes: 1},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "dasdfef", votes: 3},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "adfdef", votes: 4},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "def", votes: 5},{name: "abc", artists: "def", votes: 3},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "def", votes: 3},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "def", votes: 3},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "deqwerf", votes: 5},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "deerqwf", votes: 2},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "dafef", votes: 1},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "dasdfef", votes: 3},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "adfdef", votes: 4},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
  {name: "abc", artists: "def", votes: 5}],
        close: function() {
          modal.deactivate(); 
        $timeout(function() {
          modal.destroy();
          }, 1000);
        },
        addSong: function (song) {
            $http.post(apiURL, song).then((data)=> {
            $scope.playlist=data;
            $scope.updateRepo();
          }, () => {
            alert("update failed");
          });
        },
        searchSong: function (query, searchedSongs) {
          var url = apiBaseURL + "/search/tracks/" + query;
          $http.get(url).then((data) => {
                searchedSongs.splice(0, searchedSongs.length);
                data.data.tracks.items.forEach((value) => { searchedSongs.push(value); });
          }, () => {alert("failed to search song");})
        }, 

        name: "Add a song"
      }
      });
      modal.activate();
  }

	$scope.Description = "This event is for turnups";
	$scope.playlist = {songs: [{name: "Baby", artists: "Justin Bieber", votes: 4}, 
	{name: "abc", artists: "def", votes: 3},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
	{name: "abc", artists: "def", votes: 3},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
	{name: "abc", artists: "def", votes: 3},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
	{name: "abc", artists: "deqwerf", votes: 5},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
	{name: "abc", artists: "deerqwf", votes: 2},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
	{name: "abc", artists: "dafef", votes: 1},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
	{name: "abc", artists: "dasdfef", votes: 3},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
	{name: "abc", artists: "adfdef", votes: 4},{name: "Baby", artists: "Justin Bieber", votes: 4}, 
	{name: "abc", artists: "def", votes: 5}], Name: "Name"};
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


