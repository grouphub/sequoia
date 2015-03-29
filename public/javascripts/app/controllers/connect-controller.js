var app = angular.module('pickerApp');

app.controller('ConnectController', [
  '$scope',
  '$http',
  '$location',
  '$cookieStore',
  'flashesFactory',
  function ($scope, $http, $location, $cookieStore, flashesFactory) {
    $scope.ready();

    $scope.clearJumbotron();
  }
]);

