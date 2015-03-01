var app = angular.module('pickerApp');

app.controller('SignupController', [
  '$scope',
  '$cookieStore',
  function ($scope, $cookieStore) {
    $scope.setJumbotron('signup');

    $scope.ready();
  }
]);

