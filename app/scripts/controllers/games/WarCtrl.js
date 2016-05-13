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
  $scope.automaticEnd = function () { throw "Empty !"; };
  $scope.reset = function () { throw "Empty !"; };


  /*===============================*/
  /*======private variables========*/
  /*===============================*/

  //Put here private variable
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
      $scope.cards = shuffleDeck($scope.cards);
      var giveToPlayer1 = true;
      for (var i = 0 ; i < $scope.cards.length ; i++) {
        (giveToPlayer1) ? $scope.player1Deck.push($scope.cards[i]) : $scope.player2Deck.push($scope.cards[i]);
        giveToPlayer1 = !giveToPlayer1;
      }
    }
  };

  var shufflePlayerDeck = function () {
    $scope.player1Deck = shuffleDeck($scope.player1Deck);
    $scope.player2Deck = shuffleDeck($scope.player2Deck);
  };

  var shuffleDeck = function(deck) {
    var j, x, i;
    for (i = deck.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = deck[i - 1];
        deck[i - 1] = deck[j];
        deck[j] = x;
    }
    return deck;
  };

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

  var computeWarContext = function () {
    $scope.warNumber ++;
    //if one of a player does not have any card to complete the war he loose
    if ($scope.player1Deck.length === 1 || $scope.player2Deck.length === 1) {
      $scope.gameEnd = true;
    } else {
      //play a card hidden
      $scope.cardInPool.push($scope.player1Deck[0], $scope.player2Deck[0]);
      $scope.player1Deck.shift();
      $scope.player2Deck.shift();

      //play another card
      $scope.computeTurn();
    }
  };

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

  var computeVictory = function () {
    //Victory if one player have all the cards
    if ($scope.player1Deck.length === $scope.cards.length || $scope.player2Deck.length === $scope.cards.length) {
      $scope.gameEnd = true;
    }
  };

  var initializeValue = function () {
    $scope.gameEnd = false;
    $scope.warNumber = 0;
    $scope.turnNumber = 0;
  }


  /*===============================*/
  /*======scope functions==========*/
  /*===============================*/

  $scope.initCards = function () {
    cardService.initCards($scope);
  };

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

  $scope.computeTurn = function () {
    if($scope.player1Deck.length === 0 || $scope.player2Deck.length === 0) {
      $scope.gameEnd = true;
    } else {
      //draw cards
      $scope.cardPlayedByPlayer1 = $scope.player1Deck[0];
      $scope.cardPlayedByPlayer2 = $scope.player2Deck[0];

      //remove card from each deck and put it in pool
      $scope.cardInPool.push($scope.cardPlayedByPlayer1, $scope.cardPlayedByPlayer2);
      $scope.player1Deck.shift();
      $scope.player2Deck.shift();

      //compute result of turn
      if ($scope.cardPlayedByPlayer1.value === $scope.cardPlayedByPlayer2.value) {
        computeWarContext();
      } else {
        computeVictoryOfTurn();
      }
    }
  }

  $scope.automaticEnd = function () {
    //TODO: or not ot avoid too long loop;
    while (!$scope.gameEnd) {
      $scope.computeTurn();
    }
  }

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
  }

  $scope.$on('cards_loaded', function (e, cards)  {
    $scope.cards = cards;
    //For War game, the Ace have a superior value to the King, set it here
    initSpecialRule();
  });

  $scope.game = localStorageService.get("currentGame");
  $scope.initCards();
};

angular.module('dashGameApp').controller('WarCtrl', ['$scope', 'cardService', 'sharedService', 'localStorageService', WarCtrl]);
