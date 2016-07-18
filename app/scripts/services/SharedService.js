/**
 * Copyright © 2016 by Maxime Bibos
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission of Maxime Bibos.
 *
 * Created by mbibos .
 */

var sharedService = function () {

  //Self reference
  var shared = this;


  //----------------------------------------------------------------------
  // Service interface variables declaration
  //----------------------------------------------------------------------

  shared.gameTypes;
  shared.pageTitle = "Home";


  //----------------------------------------------------------------------
  // Service functions interface
  //----------------------------------------------------------------------
  this.setGameTypes = function () { throw "Empty !"; };
  this.getGameTypes = function () { throw "Empty !"; };
  this.setPageTitle = function () { throw "Empty !"; };
  this.getPageTitle = function () { throw "Empty !"; };


  //----------------------------------------------------------------------
  // Service functions
  //----------------------------------------------------------------------

  this.setGameTypes = function (gameTypes) {
    shared.gameTypes = gameTypes;
  };

  this.getGameTypes = function () {
    return shared.gameTypes;
  };

  this.setPageTitle = function (pageTitle) {
    shared.pageTitle = pageTitle;
  };

  this.getPageTitle = function () {
    return shared.pageTitle;
  };

};

angular.module('dashGameApp').service('sharedService', [sharedService]);
