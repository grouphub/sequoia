var app = angular.module('pickerApp');

app.controller('DetailsController', [
  '$scope',
  '$cookieStore',
  function ($scope, $cookieStore) {
    $scope.clearJumbotron();

    $scope.ready();
  }
]);

