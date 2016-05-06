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
        templateUrl: 'views/game.html',
        controller: 'GameCtrl'
      })
      /*.when('/war', {
        templateUrl: 'views/cardsGames/war.html',
        controller: 'WarCtrl'
      })
      .when('/blackjack', {
        templateUrl: 'views/cardsGames/blackJack.html',
        controller: 'BlackJackCtrl'
      })
      .when('/yams', {
        templateUrl: 'views/diceGames/yams.html',
        controller: 'YamsCtrl'
      })*/
      .when('/patch-note', {
        templateUrl: 'views/pages/patch-note.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
