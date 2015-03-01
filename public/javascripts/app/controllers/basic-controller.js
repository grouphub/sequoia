var app = angular.module('pickerApp');

app.controller('BasicController', [
  '$scope',
  '$cookieStore',
  function ($scope, $cookieStore) {
    $scope.clearJumbotron();

    $scope.ready();
  }
]);

