var app = angular.module('pickerApp');

app.controller('DoctorsController', [
  '$scope',
  '$cookieStore',
  function ($scope, $cookieStore) {
    $scope.ready();
  }
]);

