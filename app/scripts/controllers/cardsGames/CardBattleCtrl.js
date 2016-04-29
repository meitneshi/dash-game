/**
 * Copyright © 2014 by eBusiness Information
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission of eBusiness Information.
 *
 * Created by mbibos on 10/03/15.
 */

var CardBattleCtrl = function ($scope, cardBattleService) {

  /*===============================*/
  /*======scope variables==========*/
  /*===============================*/

  //scope variable declared here
  $scope.cards;


  /*========================================*/
  /*======== init scope variables ==========*/
  /*========================================*/

  //scope variables init here;
  $scope.cards = [];

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
    cardBattleService.initCards($scope);
  };

  $scope.$on('cards_loaded', function (e, cards)  {
    $scope.cards = cards;
  });

  $scope.initCards();
};

angular.module('dashGameApp').controller('CardBattleCtrl', ['$scope', 'cardBattleService', CardBattleCtrl]);
