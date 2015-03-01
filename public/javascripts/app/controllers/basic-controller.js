var app = angular.module('pickerApp');

app.controller('BasicController', [
  '$scope',
  '$cookieStore',
  '$location',
  'flashesFactory',
  function ($scope, $cookieStore, $location, flashesFactory) {
    $scope.submit = function () {
      if (_($scope.enrollmentForm.age).isEmpty()) {
        flashesFactory.add('danger', 'Age must be provided.');
        return;
      }

      if (_($scope.enrollmentForm.zipcode).isEmpty()) {
        flashesFactory.add('danger', 'Zip code must be provided.');
        return;
      }

      if (!$scope.enrollmentForm.age.match(/\d+/)) {
        flashesFactory.add('danger', 'Please enter a valid age.');
        return;
      }

      if (!$scope.enrollmentForm.zipcode.match(/\d\d\d\d\d/)) {
        flashesFactory.add('danger', 'Please enter a valid zip code.');
        return;
      }

      $location.path('/doctors')
    };

    $scope.clearJumbotron();

    $scope.ready();
  }
]);

