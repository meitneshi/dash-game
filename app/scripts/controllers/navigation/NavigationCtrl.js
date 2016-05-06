/**
 * Copyright © 2014 by eBusiness Information
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission of eBusiness Information.
 *
 * Created by mbibos on 10/03/15.
 */

var NavigationCtrl = function ($scope, $location) {

  /*===============================*/
  /*======scope variables==========*/
  /*===============================*/

  //scope variable declared here
  $scope.gameSelected;
  $scope.ruleSelected;


  /*========================================*/
  /*======== init scope variables ==========*/
  /*========================================*/

  //scope variables init here;
  $scope.gameSelected = true;
  $scope.ruleSelected = false;


  /*========================================*/
  /*======== init scope functions ==========*/
  /*========================================*/

  //initialization of scope function (throw "empty")
  $scope.backHome = function () { throw "Empty !"; };
  $scope.showGamePage = function () { throw "Empty !"; };
  $scope.showRulePage = function () { throw "Empty !"; };


  /*===============================*/
  /*======private variables========*/
  /*===============================*/

  //Put here private variable


  /*===============================*/
  /*======scope functions==========*/
  /*===============================*/

  $scope.backHome = function () {
    $location.path('/');
  }

  $scope.showGamePage = function () {
    $scope.$emit("show_game_page");
    $scope.gameSelected = true;
    $scope.ruleSelected = false;
  };

  $scope.showRulePage = function () {
    $scope.$emit("show_rule_page");
    $scope.gameSelected = false;
    $scope.ruleSelected = true;
  };


};

angular.module('dashGameApp').controller('NavigationCtrl', ['$scope', '$location', 'mainService', 'sharedService', 'localStorageService', NavigationCtrl]);
