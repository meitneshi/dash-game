/**
 * Copyright © 2014 by eBusiness Information
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission of eBusiness Information.
 *
 * Created by mbibos on 10/03/15.
 */

var MenuCtrl = function ($scope, sharedService) {

  /*===============================*/
  /*======scope variables==========*/
  /*===============================*/
  //scope variable declared here
  $scope.gameTypes;


  /*========================================*/
  /*======== init scope variables ==========*/
  /*========================================*/

  //scope variables init here;
  $scope.gameTypes = sharedService.getGameTypes();


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


};

angular.module('dashGameApp').controller('MenuCtrl', ['$scope', 'sharedService', MenuCtrl]);
