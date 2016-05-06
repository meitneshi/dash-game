/**
 * Copyright © 2014 by eBusiness Information
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission of eBusiness Information.
 *
 * Created by mbibos on 10/03/15.
 */

var BlackJackCtrl = function ($scope, $rootScope, sharedService, localStorageService) {

  /*===============================*/
  /*======scope variables==========*/
  /*===============================*/

  //scope variable declared here
  $scope.game;


  /*========================================*/
  /*======== init scope variables ==========*/
  /*========================================*/

  //scope variables init here;
  $scope.game = {};

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

  if (localStorageService.get("currentGame")) {
    $scope.game = localStorageService.get("currentGame");
    if ($scope.game.name.toLowerCase() === "black jack") {
      $rootScope.errorLoading = false;
      sharedService.setPageTitle("War battle Card Game");
    } else {
      $rootScope.errorLoading = true;
    }
  }


};

angular.module('dashGameApp').controller('BlackJackCtrl', ['$scope', '$rootScope', 'sharedService', 'localStorageService', BlackJackCtrl]);
