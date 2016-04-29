/**
 * Copyright © 2014 by eBusiness Information
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission of eBusiness Information.
 *
 * Created by mbibos on 10/03/15.
 */

var cardBattleService = function ($http) {

  //Self reference
  var cardBattleService = this;


  //----------------------------------------------------------------------
  // Service interface variables declaration
  //----------------------------------------------------------------------

  this.cardBattleService = null;


  //----------------------------------------------------------------------
  // Service interface functions declaration
  //----------------------------------------------------------------------

  this.initCards = function () { throw "Empty!"; };


  //----------------------------------------------------------------------
  // Service private variables
  //----------------------------------------------------------------------

   //Put here private variable


  //----------------------------------------------------------------------
  // Init service functions
  //----------------------------------------------------------------------

  this.initCards = function (scope) {
    var cards = [];
    $http.get('/assets/cards/deck.json').success(function(response) {
        cards = cards.concat(response);
        scope.$emit('cards_loaded', cards);
    });
  }
};

angular.module('dashGameApp').service('cardBattleService', ['$http', cardBattleService]);
