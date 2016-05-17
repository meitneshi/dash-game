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
  var computeWarContext = function () {
    $scope.warNumber ++;
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
  var computeVictoryOfTurn = function () {
    if ($scope.cardPlayedByPlayer1.value > $scope.cardPlayedByPlayer2.value) {
      //player 1 win Add card in pool to deck of player 1
      for(var i = 0 ; i < $scope.cardInPool.length ; i++) {
        $scope.player1Deck.push($scope.cardInPool[i]);
      }
    } else {
      //player 2 win Add card in pool to deck of player 2
      for(var i = 0 ; i < $scope.cardInPool.length ; i++) {
        $scope.player2Deck.push($scope.cardInPool[i]);
      }
    }
    //reset pool
    $scope.cardInPool = [];
    $scope.turnNumber ++;
    computeVictory();
  };

  /**
   * Compute the Victory of the game
   */
  var computeVictory = function () {
    //Victory if one player have all the cards
    if ($scope.player1Deck.length === $scope.cards.length || $scope.player2Deck.length === $scope.cards.length) {
      $scope.gameEnd = true;
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
      //default behavior : equal repartition
      default:
        $scope.initGame(1);
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
      //draw cards
      $scope.cardPlayedByPlayer1 = cardService.drawCard($scope.player1Deck);
      $scope.cardPlayedByPlayer2 = cardService.drawCard($scope.player2Deck);

      //put each card drawn in the pool in pool
      $scope.cardInPool.push($scope.cardPlayedByPlayer1, $scope.cardPlayedByPlayer2);

      //compute result of turn
      if ($scope.cardPlayedByPlayer1.value === $scope.cardPlayedByPlayer2.value) {
        computeWarContext();
      } else {
        computeVictoryOfTurn();
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
