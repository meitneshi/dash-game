'use strict';

angular
  .module('dashGameApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/cardBattle', {
        templateUrl: 'views/cardsGames/cardBattle.html',
        controller: 'CardBattleCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
