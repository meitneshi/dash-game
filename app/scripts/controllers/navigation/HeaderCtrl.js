/**
 * Copyright © 2016 by Maxime Bibos
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission of Maxime Bibos.
 *
 * Created by mbibos .
 */

var HeaderCtrl = function ($scope, sharedService) {

  /*===============================*/
  /*======scope variables==========*/
  /*===============================*/

  //scope variable declared here
  $scope.pageTitle;


  /*========================================*/
  /*======== init scope variables ==========*/
  /*========================================*/

  //scope variables init here;
  $scope.pageTitle = sharedService.getPageTitle();


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

angular.module('dashGameApp').controller('HeaderCtrl', ['$scope', 'sharedService', HeaderCtrl]);
