/**
 * Copyright © 2016 by Maxime Bibos
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission of Maxime Bibos.
 *
 * Created by mbibos .
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

  this.initCards = function () { throw "Empty !"; };
  this.shuffleDeck = function () { throw "Empty !"; };
  this.distributeCards = function () { throw "Empty !"; };
  this.drawCard = function () { throw "Empty !"; };


  //----------------------------------------------------------------------
  // Service private variables
  //----------------------------------------------------------------------

   //Put here private variable


  //----------------------------------------------------------------------
  // Init service functions
  //----------------------------------------------------------------------

  /**
   * Retrieve a classical deck of 52 cards from the json file in assets
   */
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
  };

  /**
   * Shuffle a deck in parameter
   */
  this.shuffleDeck = function(deck) {
    var j, x, i;
    for (i = deck.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = deck[i - 1];
        deck[i - 1] = deck[j];
        deck[j] = x;
    }
    return deck;
  };

  /**
   * Distribute the {deckToDistribute} equally in all deck in {arrayOfDecksToFill}
   */
  this.distributeCards = function(arrayOfDecksToFill, deckToDistribute) {
    var numberOfPlayer = arrayOfDecksToFill.length;
    var currentPlayerIndex = 0;

    for (var i = 0 ; i < deckToDistribute.length ; i++) {
      //draw the card from the pile
      var cardToDistribute = deckToDistribute[i];

      //put the card in the current player deck
      var deckToFill = arrayOfDecksToFill[currentPlayerIndex];
      deckToFill.push(cardToDistribute);

      //pass to the next player or return to first player
      if (currentPlayerIndex === numberOfPlayer - 1) {
        currentPlayerIndex = 0;
      } else {
        currentPlayerIndex++;
      }
    }
  };

  /**
   * Draw the first card in {deckToDrawIn}
   */
  this.drawCard = function(deckToDrawIn) {
    var cardDrawn = deckToDrawIn[0];
    deckToDrawIn.shift();
    return cardDrawn;
  };
};

angular.module('dashGameApp').service('cardService', ['$http', '$rootScope', cardService]);
