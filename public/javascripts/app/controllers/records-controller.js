var app = angular.module('pickerApp');

app.controller('RecordsController', [
  '$scope',
  '$http',
  '$location',
  'flashesFactory',
  function ($scope, $http, $location, flashesFactory) {

    $scope.clearJumbotron();

    $scope.ready();

    
  }
]);
