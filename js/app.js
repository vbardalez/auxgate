
  var app = angular.module('application', [
    'ui.router',
    'ngAnimate',
    //foundation
    'foundation',
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

  app.controller('eventController', ['$scope', '$http', function ($scope, $http) {
	$scope.title = "Event";
	$scope.startEvent = function(event) {
		$http.post("abc.abc", event).then(()=> {alert("Success");}, () => {alert("Failed")});
	}
	$scope.Description = "This event is for turnups";
	$scope.playlist = {songs: [{name: "Baby", artist: "Justin Bieber", votes: 4}, 
	{name: "abc", artist: "def", votes: 3},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
	{name: "abc", artist: "def", votes: 3},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
	{name: "abc", artist: "def", votes: 3},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
	{name: "abc", artist: "deqwerf", votes: 5},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
	{name: "abc", artist: "deerqwf", votes: 2},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
	{name: "abc", artist: "dafef", votes: 1},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
	{name: "abc", artist: "dasdfef", votes: 3},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
	{name: "abc", artist: "adfdef", votes: 4},{name: "Baby", artist: "Justin Bieber", votes: 4}, 
	{name: "abc", artist: "def", votes: 5}], Name: "Name"};
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


