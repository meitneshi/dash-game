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
      .when('/cardbattle', {
        templateUrl: 'views/cardsGames/cardBattle.html',
        controller: 'CardBattleCtrl'
      })
      .when('/blackjack', {
        templateUrl: 'views/cardsGames/blackJack.html',
        controller: 'BlackJackCtrl'
      })
      .when('/yams', {
        templateUrl: 'views/diceGames/yams.html',
        controller: 'YamsCtrl'
      })
      .when('/patch-note', {
        templateUrl: 'views/pages/patch-note.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
