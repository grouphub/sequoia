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

    $scope.loading = function () {
      $scope.isLoading = true;
    };

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

    // =================
    // Jumbotron methods
    // =================

    $scope.setJumbotron = function (name) {
      $scope.jumbotron = name;
    };

    $scope.clearJumbotron = function () {
      $scope.jumbotron = undefined;
    };

    // ================
    // Enrollment stuff
    // ================

    $scope.plans = undefined;

     // ================
    // Enrollment stuff
    // ================

    $scope.callBroker = function() {

      sinchClient = new SinchClient({
          applicationKey: '3b82c382-1a34-41cb-bf38-42eba9d8d7e4',
          applicationSecret: 's9wKLFx5UUWQ0Py+Vgj5Cg==',
          capabilities: {calling: true},
      });

      function showCall() {
        console.log('showing call', sinchClient. arguments)
      }

      function handleError() {
        console.log('error call', sinchClient, arguments)
      }

      function callListener() {
        console.log('error call', sinchClient, arguments)
      }

      var username = 'foo1234'
      var password = 'foo1234'
      var callUsername = ''

       var loginObject = {username: username, password: password};
        sinchClient.newUser(loginObject, function(ticket) {
          sinchClient.start(ticket, function() {
            global_username = username;
            showCall();
          }).fail(handleError);
        }).fail(handleError);

        var callClient = sinchClient.getCallClient();

        call = callClient.callPhoneNumber($('+14159882111').val());

        call.addEventListener(callListener);

      var callClient = sinchClient.getCallClient();
      var call;

      call = callClient.callUser(callUsername);
      call.addEventListener(callListener);
    }
  }
]);

