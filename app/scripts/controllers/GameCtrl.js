/**
 * Copyright © 2016 by Maxime Bibos
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission of Maxime Bibos.
 *
 * Created by mbibos .
 */

var GameCtrl = function ($scope, $rootScope, sharedService, localStorageService) {


  /*===============================*/
  /*======scope variables==========*/
  /*===============================*/

  //scope variable declared here
  $scope.game;
  $scope.rulePage;
  $scope.gamePage;
  $scope.gameViewUrl;


  /*========================================*/
  /*======== init scope variables ==========*/
  /*========================================*/

  //scope variables init here;
  $scope.game = {};
  $scope.rulePage = false;
  $scope.gamePage = true;
  $scope.gameViewUrl = "";

  /*========================================*/
  /*======== init scope functions ==========*/
  /*========================================*/

  //initialization of scope function (throw "empty")


  /*===============================*/
  /*======private variables========*/
  /*===============================*/

  //Put here private variable


  /*===============================*/
  /*======scope functions==========*/
  /*===============================*/

  $scope.$on("show_rule_page", function () {
    $scope.rulePage = true;
    $scope.gamePage = false;
  });

  $scope.$on("show_game_page", function () {
    $scope.rulePage = false;
    $scope.gamePage = true;
  });

  if (localStorageService.get("currentGame")) {
    $scope.game = localStorageService.get("currentGame");
    $rootScope.errorLoading = false;
    sharedService.setPageTitle($scope.game.name);
    $scope.gameViewUrl = "views/games/" + $scope.game.endpoint + ".html"
  }
};

angular.module('dashGameApp').controller('GameCtrl', ['$scope', '$rootScope', 'sharedService', 'localStorageService', GameCtrl]);
