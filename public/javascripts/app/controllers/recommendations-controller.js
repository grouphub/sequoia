var app = angular.module('pickerApp');

app.controller('RecommendationsController', [
  '$scope',
  '$cookieStore',
  function ($scope, $cookieStore) {
    $scope.clearJumbotron();

    $scope.ready();
  }
]);

