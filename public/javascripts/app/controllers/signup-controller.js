var app = angular.module('pickerApp');

app.controller('SignupController', [
  '$scope',
  '$cookieStore',
  function ($scope, $cookieStore) {
    $scope.ready();
  }
]);

