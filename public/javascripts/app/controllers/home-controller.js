var app = angular.module('pickerApp');

app.controller('HomeController', function ($scope) {
  $scope.setJumbotron('home');

  $scope.ready();
});

