var app = angular.module('pickerApp');

app.controller('DoctorsController', [
  '$scope',
  '$http',
  '$location',
  '$cookieStore',
  'flashesFactory',
  function ($scope, $http, $location, $cookieStore, flashesFactory) {
    var email;
    var age;
    var zipcode;

    if (!picker.user) {
      // ...
    }

    if (_($scope.enrollmentForm.age).isEmpty()) {
      flashesFactory.add('danger', 'Age must be provided.');
      return;
    }

    if (_($scope.enrollmentForm.zipcode).isEmpty()) {
      flashesFactory.add('danger', 'Zip code must be provided.');
      return;
    }

    age = $scope.enrollmentForm.age;
    zipcode = $scope.enrollmentForm.zipcode;

    $http
      .get('/api/v1/plans.json?zipcode=' + zipcode + '&age=' + age)
      .then(function (response) {
        $scope.plans = response.data;
        window.picker.plans = $scope.plans;

        $scope.ready();
      })
      .catch(function (response) {
        var message = (response.data && response.data.error) ?
          response.data.error :
          'An error occurred.';

        flashesFactory.add('danger', message);
      });

    $scope.clearJumbotron();
  }
]);

