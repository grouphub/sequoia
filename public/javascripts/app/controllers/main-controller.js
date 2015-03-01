var app = angular.module('pickerApp');

app.controller('MainController', [
  '$scope',
  '$timeout',
  '$http',
  '$location',
  'eventsFactory',
  'flashesFactory',
  function ($scope, $timeout, $http, $location, eventsFactory, flashesFactory) {
    // ============
    // Event system
    // ============

    $scope.vent = eventsFactory;

    // ================
    // Loading behavior
    // ================

    $scope.isLoading = true;

    $scope.$on('$locationChangeStart', function(event) {
      $scope.isLoading = true;
    });

    $scope.ready = function () {
      $timeout(function () {
        $scope.isLoading = false;
      }, 100);
    };

    // =======
    // Flashes
    // =======

    // Setup flashes
    $scope.vent.on($scope, 'flashes:changed', function (flashes) {
      $scope.flashes = flashes;
    });

    _(window.picker.flashes).each(function (flash) {
      flashesFactory.add(flash.type, flash.message);
    });

    // Update age of flashes
    $scope.$on('$locationChangeStart', function(event) {
      flashesFactory.update();
    });

    $('body').delegate('.alert', 'click', function (e) {
      var $me = $(this)
      var message = $me.find('.message').text();
      var type = $me.data('kind');

      flashesFactory.remove(type, message);

      // NOTE: Should not need to do this manually
      $me.remove();
    });

    // ============
    // User methods
    // ============

    $scope.currentUser = function () {
      return picker.user;
    };

    $scope.isSignedin = function () {
      return !!picker.user;
    };

    $scope.signout = function () {
      $http
        .delete('/api/v1/users/signin.json')
        .then(function(response) {
          window.picker.user = null;

          flashesFactory.add('success', 'You have signed out.');

          $location.path('/')
        })
        .catch(function(response) {
          var message = (response.data && response.data.error) ?
            response.data.error :
            'An error occurred.';

          flashesFactory.add('danger', message);
        });
    };

    $scope.setJumbotron = function (name) {
      $scope.jumbotron = name;
    };

    $scope.clearJumbotron = function () {
      $scope.jumbotron = undefined;
    };
  }
]);

