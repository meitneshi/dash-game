/**
 * Copyright © 2014 by eBusiness Information
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission of eBusiness Information.
 *
 * Created by mbibos on 10/03/15.
 */

var WarCtrl = function ($scope, cardService, sharedService, localStorageService) {


  /*===============================*/
  /*======scope variables==========*/
  /*===============================*/

  //scope variable declared here
  $scope.game;
  $scope.cards;
  $scope.warInitialized;
  $scope.player1Deck;
  $scope.player2Deck;
  $scope.cardPlayedByPlayer1;
  $scope.cardPlayedByPlayer2;
  $scope.cardInPool;
  $scope.turnNumber;
  $scope.warNumber;
  $scope.gameEnd;
  $scope.player1CardImgName;
  $scope.player2CardImgName;
  $scope.player1Score;
  $scope.player2Score;
  $scope.poolScore;
  $scope.targetedScore;
  $scope.winner;
  $scope.player1Name;
  $scope.player2Name;


  /*========================================*/
  /*======== init scope variables ==========*/
  /*========================================*/

  //scope variables init here;
  $scope.game = {};
  $scope.cards = [];
  $scope.warInitialized = false;
  $scope.player1Deck = [];
  $scope.player2Deck = [];
  $scope.cardPlayedByPlayer1 = {};
  $scope.cardPlayedByPlayer2 = {};
  $scope.cardInPool = [];
  $scope.turnNumber = 0;
  $scope.warNumber = 0;
  $scope.gameEnd = false;
  $scope.player1CardImgName = null;
  $scope.player2CardImgName = null;
  $scope.player1Score = 0;
  $scope.player2Score = 0;
  $scope.poolScore = 0;
  $scope.targetedScore = 10;
  $scope.winner = null;
  $scope.player1Name = "Player 1";
  $scope.player2Name = "Player 2 (CPU)";


  /*========================================*/
  /*======== init scope functions ==========*/
  /*========================================*/

  //initialization of scope function (throw "empty")
  $scope.initCards = function () { throw "Empty !"; };
  $scope.initGame = function () { throw "Empty !"; };
  $scope.computeTurn = function () { throw "Empty !"; };
  $scope.reset = function () { throw "Empty !"; };


  /*===============================*/
  /*======private variables========*/
  /*===============================*/

  /**
   * Distribute Card equally (each color to each player) or randomly (call to services)
   */
  var distributeCard = function (equaly) {
    $scope.player1Deck = [];
    $scope.player2Deck = [];
    if (equaly) {
      angular.forEach($scope.cards, function(card){
        if(card.color === "black") {
          $scope.player1Deck.push(card);
        } else if (card.color === "red") {
          $scope.player2Deck.push(card);
        }
      });
    } else {
      $scope.cards = cardService.shuffleDeck($scope.cards);
      cardService.distributeCards([$scope.player1Deck, $scope.player2Deck], $scope.cards);
    }
  };

  /**
   * Shuffle All player decks
   */
  var shufflePlayerDeck = function () {
    $scope.player1Deck = cardService.shuffleDeck($scope.player1Deck);
    $scope.player2Deck = cardService.shuffleDeck($scope.player2Deck);
  };

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
    $scope.warNumber ++;
    poolScore++;
    $scope.poolScore = poolScore;
    //if one of a player does not have any card to complete the war he loose
    if ($scope.player1Deck.length === 1 || $scope.player2Deck.length === 1) {
      $scope.gameEnd = true;
    } else {
      //play a card hidden
      var hiddenPlayer1Card = cardService.drawCard($scope.player1Deck);
      var hiddenPlayer2Card = cardService.drawCard($scope.player2Deck);
      $scope.cardInPool.push(hiddenPlayer1Card, hiddenPlayer2Card);

      //play another card
      $scope.computeTurn();
    }
  };

  /**
   * Compute the victory of a turn
   */
  var computeVictoryOfTurn = function (poolScore) {
    if ($scope.cardPlayedByPlayer1.value > $scope.cardPlayedByPlayer2.value) {
      //player 1 win Add card in pool to deck of player 1
      for(var i = 0 ; i < $scope.cardInPool.length ; i++) {
        $scope.player1Deck.push($scope.cardInPool[i]);
      }
      //add poolScore to player1Score
      $scope.player1Score += poolScore;
    } else {
      //player 2 win Add card in pool to deck of player 2
      for(var i = 0 ; i < $scope.cardInPool.length ; i++) {
        $scope.player2Deck.push($scope.cardInPool[i]);
      }
      //add poolScore to player2Score
      $scope.player2Score += poolScore;
    }
    //reset pool
    $scope.cardInPool = [];
    $scope.poolScore = 0;
    $scope.turnNumber ++;
    computeVictory();
  };

  /**
   * Compute the Victory of the game
   */
   //TODO : implement dynamic player name
  var computeVictory = function () {
    //Victory if one player have the targeted score
    if ($scope.player1Score >= $scope.targetedScore) {
      $scope.gameEnd = true;
      $scope.winner = $scope.player1Name;
    } else if ($scope.player2Score >= $scope.targetedScore) {
      $scope.gameEnd = true;
      $scope.winner = $scope.player1Name;
    }
  };

  /**
   * Initialize the value for war initialization
   */
  var initializeValue = function () {
    $scope.gameEnd = false;
    $scope.warNumber = 0;
    $scope.turnNumber = 0;
  }

  /**
   * Compute the image name associated to a card
   * The name is build from the label and symbol like "label_symbol.png" all in lower case
   * Exxample : "ace_clubs.png", "2_diamondss.png", ...
   */
   var computeCardImgName = function (card) {
     return card.label.toLowerCase() + "_" + card.symbol.toLowerCase() + ".png";
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
   * Init the game : distribute the card, shuffle the players deck and initializ game value
   */
  $scope.initGame = function (gameType) {
    switch (gameType) {
      //gameType === 0 => random repartition of cards
      case 0:
        distributeCard(false);
        break;
      //gameType === 1 => equal repartition of cards (red vs black)
      case 1:
        distributeCard(true);
        break;
      //default behavior : random repartition
      default:
        $scope.initGame(0);
        break;
    }
    shufflePlayerDeck();
    $scope.warInitialized = true;
    initializeValue();
  };

  /**
   * Process the turn
   */
  $scope.computeTurn = function () {
    if($scope.player1Deck.length === 0 || $scope.player2Deck.length === 0) {
      $scope.gameEnd = true;
    } else {

      //Add 1 in pool Score
      $scope.poolScore++;

      //draw cards
      $scope.cardPlayedByPlayer1 = cardService.drawCard($scope.player1Deck);
      $scope.cardPlayedByPlayer2 = cardService.drawCard($scope.player2Deck);

      //compute the name of the card to display the image
      $scope.player1CardImgName = computeCardImgName($scope.cardPlayedByPlayer1);
      $scope.player2CardImgName = computeCardImgName($scope.cardPlayedByPlayer2);

      //put each card drawn in the pool in pool
      $scope.cardInPool.push($scope.cardPlayedByPlayer1, $scope.cardPlayedByPlayer2);

      //compute result of turn
      if ($scope.cardPlayedByPlayer1.value === $scope.cardPlayedByPlayer2.value) {
        computeWarContext($scope.poolScore);
      } else {
        computeVictoryOfTurn($scope.poolScore);
      }
    }
  };

  /**
   * Reset the game
   */
  $scope.reset = function () {
    $scope.warInitialized = false;
    $scope.player1Deck = [];
    $scope.player2Deck = [];
    $scope.cardPlayedByPlayer1 = {};
    $scope.cardPlayedByPlayer2 = {};
    $scope.cardInPool = [];
    $scope.turnNumber = 0;
    $scope.warNumber = 0;
    $scope.gameEnd = false;
    $scope.player1CardImgName = null;
    $scope.player1CardImgName = null;
    $scope.player1Score = 0;
    $scope.player2Score = 0;
    $scope.poolScore = 0;
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
};

angular.module('dashGameApp').controller('WarCtrl', ['$scope', 'cardService', 'sharedService', 'localStorageService', WarCtrl]);
