'use strict';

angular
  .module('dashGameApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/game', {
        templateUrl: 'views/pages/game.html',
        controller: 'GameCtrl'
      })
      .when('/patch-note', {
        templateUrl: 'views/pages/patch-note.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
