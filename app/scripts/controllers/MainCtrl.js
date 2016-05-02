/**
 * Copyright © 2014 by eBusiness Information
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission of eBusiness Information.
 *
 * Created by mbibos on 10/03/15.
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
    $location.path('/' + game.endpoint);
  };

  $scope.$on("games_initialized", function (e, games) {
    $scope.allGames = games;
    initializeTypeGameList($scope.allGames);
    setDisplayGames(localStorageService.get("selectedGameType"));
  });

  $scope.$on("game_type_change", function (e, gameType) {
    setDisplayGames(gameType);
  });

  $scope.initGames();
  localStorageService.set("selectedGameType", "card");
};

angular.module('dashGameApp').controller('MainCtrl', ['$scope', '$location', 'mainService', 'sharedService', 'localStorageService', MainCtrl]);
