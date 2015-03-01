var app = angular.module('pickerApp');

app.controller('SuccessController', [
  '$scope',
  '$cookieStore',
  function ($scope, $cookieStore) {
    $scope.clearJumbotron();

    $scope.ready();
  }
]);

