/**
 * Copyright © 2016 by Maxime Bibos
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission ofMaxime Bibosn.
 *
 * Created by mbibos .
 */

var YamsCtrl = function ($scope, sharedService, localStorageService) {

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

  $scope.game = localStorageService.get("currentGame");
};

angular.module('dashGameApp').controller('YamsCtrl', ['$scope', 'sharedService', 'localStorageService', YamsCtrl]);
