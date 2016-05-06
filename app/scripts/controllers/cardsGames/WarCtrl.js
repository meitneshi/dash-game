/**
 * Copyright © 2014 by eBusiness Information
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission of eBusiness Information.
 *
 * Created by mbibos on 10/03/15.
 */

var WarCtrl = function ($scope, $rootScope, cardService, sharedService, localStorageService) {


  /*===============================*/
  /*======scope variables==========*/
  /*===============================*/

  //scope variable declared here
  $scope.game;
  $scope.cards;
  $scope.rulePage;
  $scope.gamePage;


  /*========================================*/
  /*======== init scope variables ==========*/
  /*========================================*/

  //scope variables init here;
  $scope.game = {};
  $scope.cards = [];
  $scope.rulePage = false;
  $scope.gamePage = true;

  /*========================================*/
  /*======== init scope functions ==========*/
  /*========================================*/

  //initialization of scope function (throw "empty")
  $scope.initCards = function () { throw "Empty !"; };


  /*===============================*/
  /*======private variables========*/
  /*===============================*/

  //Put here private variable


  /*===============================*/
  /*======scope functions==========*/
  /*===============================*/

  $scope.initCards = function () {
    cardService.initCards($scope);
  };

  $scope.$on('cards_loaded', function (e, cards)  {
    $scope.cards = cards;
  });

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
    if ($scope.game.name.toLowerCase() === "war") {
      $rootScope.errorLoading = false;
      sharedService.setPageTitle("War Battle Card Game");
      $scope.initCards();
    } else {
      $rootScope.errorLoading = true;
    }
  }



};

angular.module('dashGameApp').controller('WarCtrl', ['$scope', '$rootScope', 'cardService', 'sharedService', 'localStorageService', WarCtrl]);
