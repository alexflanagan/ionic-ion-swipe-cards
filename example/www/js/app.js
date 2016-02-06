

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'tapjolt' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('tapjolt', ['ionic', 'ionic.contrib.ui.cards', 'ngSanitize'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})


.controller('CardsCtrl', function($scope, $http, $ionicSwipeCardDelegate) {
  var cardTypes = [];

  var fingerprint = null;
  var fingerprintJS = null;

  $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

  $scope.init = function () {
    console.log('init!');
    fingerprintJS = new Fingerprint2();
    fingerprintJS.get(function (result, components) {
      fingerprint = result;
      console.log('fingerprint calculated: ' + fingerprint);
      components.map(function(x) { console.log(x.key); });
    });
  };

  $scope.cardSwiped = function(index) {
    var name = 'intro card';
    
    if (index > -1 && $scope.cards[index] && $scope.cards[index].title) {
      name = $scope.cards[index].title.rendered;
    }

    var direction = 0;
    if (OWATracker) {
      if (fingerprint !== null) {
        OWATracker.trackAction(name, 'swipe', fingerprint, direction);
        console.log('swipe fingerprint: ' + fingerprint);
      } else {
        if (fingerprintJS !== null) {
          fingerprintJS.get(function (result, components) {
            fingerprint = result;
            OWATracker.trackAction(name, 'swipe', result, direction);
            console.log('swipe result: ' + result);
          });
        } else {
          OWATracker.trackAction(name, 'swipe', name, direction);
          console.log('swipe default: ' + name);
        }
      }
    }

    $scope.addCard(index);
  };

  $scope.cardTapped = function(index) {
    var name = 'intro card';
    
    if (index > -1 && $scope.cards[index] && $scope.cards[index].title) {
      name = $scope.cards[index].title.rendered;
    }

    var position = 1;
    if (OWATracker) {
      if (fingerprint !== null) {
        OWATracker.trackAction(name, 'doubletap', fingerprint, position);
        console.log('doubletap fingerprint: ' + fingerprint);
      } else {
        if (fingerprintJS !== null) {
          fingerprintJS.get(function (result, components) {
            fingerprint = result;
            OWATracker.trackAction(name, 'doubletap', result, position);
            console.log('doubletap result: ' + result);
          });
        } else {
          OWATracker.trackAction(name, 'doubletap',  name, position);
          console.log('doubletap default: ' + name);
        }
      }
    }
    
    $scope.addCard(index);
  };

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.getStartPage = function() {
    // TODO: Get this from user data.
    return 0;
  };

  $scope.getPageSize = function() {
    // TODO: Load this from remote.
    return 10;
  };

  $scope.getMinimumDeckSize = function() {
    // TODO: Load this from remote too. Or calculate off latency.
    return 3;
  };

  $scope.currentPage = $scope.getStartPage();
  $scope.pageSize = $scope.getPageSize();

  $scope.getPaginationQueryParams = function() {
    var queryParams = [
      ['per_page', $scope.pageSize].join('='),
      ['page', $scope.currentPage].join('=')
    ].join('&');

    queryParams = ['?', queryParams].join('');

    console.log(queryParams);
    return queryParams;
  };

  $scope.addCard = function(oldCardIndex) {
    var index = Math.floor(Math.random() * cardTypes.length); 
    var newCard = cardTypes[index];
    cardTypes.splice(index, 1);

    console.log(cardTypes.length);

    if (cardTypes.length < $scope.getMinimumDeckSize()) {
      $scope.getMoreCards();
    }

    if (newCard === undefined) {
      newCard = {
        id: -1,
        content: {
          rendered: '<p>Loading more cards...</p>'
        },
        title: {
          rendered: 'Loading.'
        }
      };
    }

    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
    $scope.cardContent = (newCard.content ? newCard.content.rendered : '<p>Loading more cards...</p>');

    // TODO: index within deck position.
    var deckPosition = $scope.currentPage * $scope.pageSize;
    
    if (OWATracker) {
      if (fingerprint !== null) {
        OWATracker.trackAction(newCard.title.rendered, 'load', fingerprint, deckPosition);
        console.log('load fingerprint: ' + fingerprint);
      } else {
        if (fingerprintJS !== null) {
          fingerprintJS.get(function (result, components) {
            fingerprint = result;
            OWATracker.trackAction(newCard.title.rendered, 'load', result, deckPosition);
            console.log('load result: ' + fingerprint);
          });
        } else {
          OWATracker.trackAction(newCard.title.rendered, 'load', newCard.title.rendered, deckPosition);
          console.log('load default: ' + newCard.title.rendered);
        }
      }
    }
  }

  $scope.getMoreCards = function() {
    $http.get(['//api.tapjo.lt/api/profiles', fingerprint].join('/')).then(function(positionResponse) {

      // TODO: get deck position

      // TODO: Pagination. Preloading. Caching.
      $scope.currentPage = $scope.currentPage + 1;

      $http.get(['http://cms.tapjo.lt/wp-json/wp/v2/posts', $scope.getPaginationQueryParams()].join('/')).then(function(response) {
        cardTypes = cardTypes.concat(response.data);
      });
    });
  };

  $scope.getMoreCards();
})

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  $scope.goAway = function() {
    var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
    card.swipe();
  };
});
