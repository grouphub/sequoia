var app = angular.module('pickerApp');

app.controller('DashboardController', [
  '$scope',
  '$cookieStore',
  '$location',
  'flashesFactory',
  function ($scope, $cookieStore, $location, flashesFactory) {
    $scope.setJumbotron('dashboard');

    $scope.ready();
  }
]);


