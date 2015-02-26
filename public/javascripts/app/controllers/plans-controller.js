var app = angular.module('pickerApp');

app.controller('PlansController', function ($scope, $http) {
  $http
    .get('/api/v1/plans.json')
    .success(function (data, status, headers, config) {
      var plans = data.plans;

      $scope.ready();
    })
    .error(function (data, status, headers, config) {
      debugger
    })
});

