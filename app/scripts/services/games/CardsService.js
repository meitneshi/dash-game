/**
 * Copyright © 2014 by eBusiness Information
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission of eBusiness Information.
 *
 * Created by mbibos on 10/03/15.
 */

var cardService = function ($http, $rootScope) {

  //Self reference
  var cardService = this;


  //----------------------------------------------------------------------
  // Service interface variables declaration
  //----------------------------------------------------------------------

  this.cardService = null;


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
    $http.get('/assets/cards/deck.json')
    .success(function(response) {
        $rootScope.errorLoading = false;
        cards = cards.concat(response);
        scope.$emit('cards_loaded', cards);
    })
    .error(function() {
        $rootScope.errorLoading = true;
    });
  }
};

angular.module('dashGameApp').service('cardService', ['$http', '$rootScope', cardService]);
