var app = angular.module('pickerApp');

app.controller('OnboardingController', [
  '$scope',
  '$http',
  '$location',
  'flashesFactory',
  function ($scope, $http, $location, flashesFactory) {

    $scope.clearJumbotron();

    $scope.ready();
  }
]);
