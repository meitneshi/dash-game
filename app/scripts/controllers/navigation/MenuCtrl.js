/**
 * Copyright © 2016 by Maxime Bibos
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission of Maxime Bibos.
 *
 * Created by mbibos .
 */

var MenuCtrl = function ($scope, sharedService, localStorageService) {

  /*===============================*/
  /*======scope variables==========*/
  /*===============================*/
  //scope variable declared here
  $scope.gameTypes;
  $scope.selectedGameType;


  /*========================================*/
  /*======== init scope variables ==========*/
  /*========================================*/

  //scope variables init here;
  $scope.gameTypes = sharedService.getGameTypes();
  $scope.selectedGameType = localStorageService.get("selectedGameType");


  /*========================================*/
  /*======== init scope functions ==========*/
  /*========================================*/

  //initialization of scope function (throw "empty")
  $scope.selectType = function () { throw "Empty !"; };
  $scope.isSelected = function () { throw "Empty !"; };


  /*===============================*/
  /*======private variables========*/
  /*===============================*/

  //Put here private variable


  /*===============================*/
  /*======scope functions==========*/
  /*===============================*/

  $scope.selectType = function (gameType) {
    localStorageService.set("selectedGameType", gameType);
    $scope.$emit("game_type_change", gameType);
  };

  $scope.isSelected = function (gameType) {
    return (localStorageService.get("selectedGameType") === gameType);
  }


};

angular.module('dashGameApp').controller('MenuCtrl', ['$scope', 'sharedService', 'localStorageService', MenuCtrl]);
