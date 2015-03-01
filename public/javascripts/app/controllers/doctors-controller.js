var app = angular.module('pickerApp');

app.controller('DoctorsController', [
  '$scope',
  '$http',
  '$location',
  '$cookieStore',
  'flashesFactory',
  function ($scope, $http, $location, $cookieStore, flashesFactory) {
    var age = $cookieStore.get('age');
    var zipcode = $cookieStore.get('zipcode');

    if (!picker.user) {
      // ...
    }

    if (_(age).isEmpty()) {
      flashesFactory.add('danger', 'Age must be provided.');
      return;
    }

    if (_(zipcode).isEmpty()) {
      flashesFactory.add('danger', 'Zip code must be provided.');
      return;
    }

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

