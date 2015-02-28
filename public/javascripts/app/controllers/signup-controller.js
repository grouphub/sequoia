var app = angular.module('pickerApp');

app.controller('SignupController', [
  '$scope',
  '$cookieStore',
  function ($scope, $cookieStore) {
    console.log('yes');
    $scope.ready();
  }
]);

