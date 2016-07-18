/**
 * Copyright © 2016 by Maxime Bibos
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission of Maxime Bibos.
 *
 * Created by mbibos .
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
  };
};

angular.module('dashGameApp').service('mainService', ['$http', mainService]);
