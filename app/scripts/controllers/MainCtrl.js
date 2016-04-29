/**
 * Copyright © 2014 by eBusiness Information
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission of eBusiness Information.
 *
 * Created by mbibos on 10/03/15.
 */

var MainCtrl = function ($scope, $location, mainService) {

  /*===============================*/
  /*======scope variables==========*/
  /*===============================*/

  //scope variable declared here
  $scope.games;


  /*========================================*/
  /*======== init scope variables ==========*/
  /*========================================*/

  //scope variables init here;
  $scope.games = [];


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


  /*===============================*/
  /*======scope functions==========*/
  /*===============================*/

  $scope.initGames = function () {
    mainService.initGames($scope);
  };

  $scope.loadGame = function (game) {
    $location.path('/' + game.endpoint);
  }

  $scope.$on("games_initialized", function (e, games) {
    $scope.games = games;
  });

  $scope.initGames();
};

angular.module('dashGameApp').controller('MainCtrl', ['$scope', '$location', 'mainService', MainCtrl]);
