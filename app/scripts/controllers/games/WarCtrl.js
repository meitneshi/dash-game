/**
 * Copyright © 2016 by Maxime Bibos
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission of Maxime Bibos.
 *
 * Created by mbibos .
 */

var WarCtrl = function ($scope, cardService, sharedService, localStorageService) {


  /*===============================*/
  /*======scope variables==========*/
  /*===============================*/

  //scope variable declared here
  $scope.game;
  $scope.cards;
  $scope.players;
  $scope.gameData;


  /*========================================*/
  /*======== init scope variables ==========*/
  /*========================================*/

  //scope variables init here;
  $scope.game = {};
  $scope.cards = [];
  $scope.players = [];
  $scope.gameData = {};


  /*========================================*/
  /*======== init scope functions ==========*/
  /*========================================*/

  //initialization of scope function (throw "empty")
  $scope.initCards = function () { throw "Empty !"; };
  $scope.computeTurn = function () { throw "Empty !"; };
  $scope.reset = function () { throw "Empty !"; };
  $scope.initPlayers = function () { throw "Empty !"; };
  $scope.distribute = function () { throw "Empty !"; };


  /*===============================*/
  /*======private variables========*/
  /*===============================*/

  /**
   * Initialize the special Rules for War
   */
  var initSpecialRule = function () {
    for (var i = 0 ; i < $scope.cards.length ; i++) {
      if ($scope.cards[i].value === 1) {
        var card = $scope.cards[i];
        card.value = 15;
        $scope.cards.splice(i, 1);
        $scope.cards.push(card);
      }
    }
  };

  /**
   * Deal with the war context during the game
   */
  var computeWarContext = function (poolScore) {
    $scope.gameData.warNumber ++;
    poolScore++;
    $scope.gameData.poolScore = poolScore;
    //if one of a player does not have any card to complete the war he loose
    angular.forEach($scope.players, function (player) {
        if (player.deck.length === 1) {
          $scope.gameData.gameEnd = true;
        }
    });

    if (!$scope.gameData.gameEnd) {
      // play hidden card
      angular.forEach($scope.players, function (player) {
        var hiddenPlayedCard = cardService.drawCard(player.deck);
        $scope.gameData.cardInPool.push(hiddenPlayedCard);
      });

      // play another card
      $scope.computeTurn();
    }
  };

  /**
   * Compute the victory of a turn
   */
  var computeVictoryOfTurn = function (poolScore) {
    var winnerOfTurn = $scope.players[0];

    angular.forEach($scope.players, function (player) {
      if(player.cardPlayed.value > winnerOfTurn.cardPlayed.value) {
        winnerOfTurn = player;
      }
    });

    winnerOfTurn.score += poolScore;
    for(var i = 0 ; i < $scope.gameData.cardInPool.length ; i++) {
      winnerOfTurn.deck.push($scope.gameData.cardInPool[i]);
    }
    //reset pool
    $scope.gameData.cardInPool = [];
    $scope.gameData.poolScore = 0;
    $scope.gameData.turnNumber ++;
    computeVictory();
  };

  /**
   * Compute the Victory of the game
   */
  var computeVictory = function () {
    //Victory if one player have the targeted score
    angular.forEach($scope.players, function (player) {
      if (player.score >= $scope.gameData.targetedScore) {
        $scope.gameData.gameEnd = true
        $scope.gameData.winner = player;
      }
    });
  };

  /**
   * Initialize the value for war initialization
   */
  var initializeValue = function () {
    $scope.gameData.gameEnd = false;
    $scope.gameData.warNumber = 0;
    $scope.gameData.turnNumber = 0;
  }

  /**
   * Compute the image name associated to a card
   * The name is build from the label and symbol like "label_symbol.png" all in lower case
   * Exxample : "ace_clubs.png", "2_diamondss.png", ...
   */
   var computeCardImgName = function (card) {
     return card.label.toLowerCase() + "_" + card.symbol.toLowerCase() + ".png";
   }

   /**
    * Initialize the Object gameData on scope
    */
   var initializeGameData = function () {
     $scope.gameData = {
       "gameEnd": false,
       "warInitialized": false,
       "turnNumber": 0,
       "warNumber": 0,
       "poolScore": 0,
       "targetedScore": 10,
       "cardInPool": [],
       "winner": null,
       "nbPlayers": "0",
       "resolution": {
         "code": "2",
         "label": "medium"
       }
     }
   }

   /**
    * Set resolution of the game
    */
   var setResolution = function (resolution) {
     console.log(resolution)
     switch (resolution.code) {
       case "1":
          //Small resolution (board : w: - h: )
          $scope.gameData.resolution.label="small";
          break;
      case "2":
          //Medium resolution (board : w: - h: )
          $scope.gameData.resolution.label="medium";
          break;
      case "3":
          //Large resolution (board : w: 900px - h: 700px)
          $scope.gameData.resolution.label="large";
          break;
      default:
          //Dfault Medium Resolution
          $scope.gameData.resolution.code="2";
          $scope.gameData.resolution.label="medium";
          break;
     }
   }


  /*===============================*/
  /*======scope functions==========*/
  /*===============================*/

  /**
   * Initialization of the cards for the game
   */
  $scope.initCards = function () {
    cardService.initCards($scope);
  };

  /**
   * Process the turn
   */
  $scope.computeTurn = function () {
    angular.forEach($scope.players, function (player) {
      if (player.deck.length === 0) {
          $scope.gameData.gameEnd = true;
      }
    });

    if (!$scope.gameData.gameEnd) {
      $scope.gameData.poolScore++;

      // each Player draw the top card
      angular.forEach($scope.players, function (player) {
        player.cardPlayed = cardService.drawCard(player.deck);
        player.cardImgName = computeCardImgName(player.cardPlayed);
        $scope.gameData.cardInPool.push(player.cardPlayed);
      });

      if ($scope.players[0].cardPlayed.value === $scope.players[1].cardPlayed.value) {
        computeWarContext($scope.gameData.poolScore);
      } else {
        computeVictoryOfTurn($scope.gameData.poolScore);
      }
    }
  };

  /**
   * Reset the game
   */
  $scope.reset = function () {
    initializeGameData();
    $scope.players = [];
  };

  /**
   * Init the array of players
   */
  $scope.initPlayers = function () {
    //reset the arrayof players
    $scope.players = [];

    //create the non AI players
    for (var i = 0; i < $scope.gameData.nbPlayers; i++) {
      var player = {
        "name": "Player " + (i+1),
        "score": 0,
        "cardPlayed": {},
        "cardImgName": null,
        "deck": []
      };
      $scope.players.push(player);
    }

    //Add AI player if needed (ONLY IF non AI player have been initialized)
    if ($scope.players.length !== 0 && $scope.game.AIPlayersRequired) {
      var AIPlayer = {
        "name": "Player CPU",
        "score": 0,
        "cardPlayed": {},
        "cardImgName": null,
        "deck": []
      };

      $scope.players.push(AIPlayer);
    }
  };

  /**
   * Distribute the cards to all players
   */
  $scope.distribute = function () {
    //set resolution
    setResolution($scope.gameData.resolution);

    $scope.cards = cardService.shuffleDeck($scope.cards);

    var allDecks = [];
    angular.forEach($scope.players, function(player) {
      allDecks.push(player.deck);
    });

    cardService.distributeCards(allDecks, $scope.cards);

    $scope.gameData.warInitialized = true;
    initializeValue();
  };

  /**
   * Listener when the cards are loaded from the service
   */
  $scope.$on('cards_loaded', function (e, cards)  {
    $scope.cards = cards;
    //For War game, the Ace have a superior value to the King, set it here
    initSpecialRule();
  });

  //Initialization
  $scope.game = localStorageService.get("currentGame");
  $scope.initCards();
  initializeGameData();
  setResolution($scope.gameData.resolution);
};

angular.module('dashGameApp').controller('WarCtrl', ['$scope', 'cardService', 'sharedService', 'localStorageService', WarCtrl]);
