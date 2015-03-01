var app = angular.module('pickerApp');

app.controller('UsersShowController', [
  '$scope',
  '$http',
  '$routeParams',
  'flashesFactory',
  function ($scope, $http, $routeParams, flashesFactory) {
    var userId = $routeParams.userId;

    $scope.user = undefined;

    $http
      .get('/api/v1/users/' + userId + '.json')
      .then(function(response) {
        $scope.user = response.data.user;
      })
      .catch(function(response) {
        var message = (response.data && response.data.error) ?
          response.data.error :
          'An error occurred.';

        flashesFactory.add('danger', message);
      });

    $scope.clearJumbotron();

    $scope.ready();
  }
]);

