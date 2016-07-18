/**
 * Copyright © 2016 by Maxime Bibos
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission of Maxime Bibos.
 *
 * Created by mbibos .
 */

var MainCtrl = function ($scope, $location, mainService, sharedService, localStorageService) {

  /*===============================*/
  /*======scope variables==========*/
  /*===============================*/

  //scope variable declared here
  $scope.allGames;
  $scope.displayGames;
  $scope.selectedGameType;


  /*========================================*/
  /*======== init scope variables ==========*/
  /*========================================*/

  //scope variables init here;
  $scope.allGames = [];
  $scope.displayGames = []
  $scope.selectedGameType = localStorageService.get("selectedGameType");


  /*========================================*/
  /*======== init scope functions ==========*/
  /*========================================*/

  //initialization of scope function (throw "empty")
  $scope.initGames = function () { throw "Empty !"; };
  $scope.loadGame = function () { throw "Empty !"; };
  $scope.backHome = function () { throw "Empty !"; };


  /*===============================*/
  /*======private variables========*/
  /*===============================*/

  //Put here private variable
  var initializeTypeGameList = function (gamesList) {
    var gameTypes = [];
    angular.forEach(gamesList, function (game) {
      if (gameTypes.indexOf(game.type) === -1) {
          gameTypes.push(game.type);
      }
    });
    sharedService.setGameTypes(gameTypes);
  };

  var setDisplayGames = function (gameType) {
    $scope.displayGames = [];
    angular.forEach($scope.allGames, function (game) {
      if(game.type === gameType) {
        $scope.displayGames.push(game);
      }
    })
  };


  /*===============================*/
  /*======scope functions==========*/
  /*===============================*/

  $scope.initGames = function () {
    mainService.initGames($scope);
  };

  $scope.loadGame = function (game) {
    // $location.path('/' + game.endpoint);
    $location.path('/game');
    localStorageService.set("currentGame", game);
  };

  $scope.backHome = function () {
    $location.path('/');
  }

  $scope.$on("games_initialized", function (e, games) {
    $scope.allGames = games;
    initializeTypeGameList($scope.allGames);
    setDisplayGames(localStorageService.get("selectedGameType"));
  });

  $scope.$on("game_type_change", function (e, gameType) {
    setDisplayGames(gameType);
  });

  sharedService.setPageTitle("Home");
  $scope.initGames();
  localStorageService.set("selectedGameType", "Card");
};

angular.module('dashGameApp').controller('MainCtrl', ['$scope', '$location', 'mainService', 'sharedService', 'localStorageService', MainCtrl]);
