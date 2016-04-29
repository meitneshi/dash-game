/**
 * Copyright © 2014 by eBusiness Information
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission of eBusiness Information.
 *
 * Created by mbibos on 10/03/15.
 */

var mainService = function ($http) {

  //Self reference
  var mainService = this;


  //----------------------------------------------------------------------
  // Service interface variables declaration
  //----------------------------------------------------------------------

  this.mainService = null;


  //----------------------------------------------------------------------
  // Service interface functions declaration
  //----------------------------------------------------------------------

  this.initGames = function () { throw "Empty!"; };


  //----------------------------------------------------------------------
  // Service private variables
  //----------------------------------------------------------------------

   //Put here private variable


  //----------------------------------------------------------------------
  // Init service functions
  //----------------------------------------------------------------------

  this.initGames = function (scope) {
    $http.get('/assets/games.json').success(function(response) {
        scope.$emit('games_initialized', response);
    });
  }
};

angular.module('dashGameApp').service('mainService', ['$http', mainService]);
