/**
 * Copyright © 2016 by Maxime Bibos
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission ofMaxime Bibosn.
 *
 * Created by mbibos .
 */

var CardGameSettingsCtrl = function ($scope, localStorageService) {

  /*===============================*/
  /*======scope variables==========*/
  /*===============================*/

  //scope variable declared here
  // $scope.game = "toto";
  $scope.game= localStorageService.get("currentGame");
  $scope.gameSettings;
  $scope.gameInitialized;


  /*========================================*/
  /*======== init scope variables ==========*/
  /*========================================*/

  //scope variables init here;
  $scope.gameSettings = {
    "resolution": {
      "code": "2",
      "label": "medium"
    },
    "nbPlayers": "0",
    "targetedScore": 10,
    "playersSettings": []
  };
  $scope.gameInitialized = false;

  /*========================================*/
  /*======== init scope functions ==========*/
  /*========================================*/

  //initialization of scope function (throw "empty")
  $scope.initPlayersSettings = function () { throw "Empty !"; };
  $scope.launchGame = function () { throw "Empty !"; };


  /*===============================*/
  /*======private variables========*/
  /*===============================*/

  //Put here private variable
  var computeResolution = function () {
    switch ($scope.gameSettings.resolution.code) {
      case "1":
         //Small resolution (board : w: - h: )
         $scope.gameSettings.resolution.label="small";
         break;
     case "2":
         //Medium resolution (board : w: - h: )
         $scope.gameSettings.resolution.label="medium";
         break;
     case "3":
         //Large resolution (board : w: 900px - h: 700px)
         $scope.gameSettings.resolution.label="large";
         break;
     default:
         //Dfault Medium Resolution
         $scope.gameSettings.resolution.label="medium";
         break;
    }
  }


  /*===============================*/
  /*======scope functions==========*/
  /*===============================*/

  $scope.initPlayersSettings = function () {
    $scope.gameSettings.playersSettings = [];

    //create the non AI players
    for (var i = 0; i < $scope.gameSettings.nbPlayers; i++) {
      var player = {
        "name": "Player " + (i+1),
        "isIA": false
      };
      $scope.gameSettings.playersSettings.push(player);
    }

    //Add AI player if needed (ONLY IF non AI player have been initialized)
    if ($scope.gameSettings.playersSettings.length !== 0 && $scope.game.AIPlayersRequired) {
      var AIPlayer = {
        "name": "Player CPU",
        "isIA": true
      };
      $scope.gameSettings.playersSettings.push(AIPlayer);
    }
  }

  $scope.launchGame = function() {
    computeResolution();
    var settings = {
      "currentGame": $scope.game.name,
      "gameSettings": $scope.gameSettings
    }

    $scope.$emit("settings_initialized", settings);
  }

};

angular.module('dashGameApp').controller('CardGameSettingsCtrl', ['$scope', 'localStorageService', CardGameSettingsCtrl]);
