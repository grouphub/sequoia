var app = angular.module('pickerApp');

app.controller('UsersNewController', [
  '$scope',
  '$http',
  '$location',
  'flashesFactory',
  function ($scope, $http, $location, flashesFactory) {
    $scope.form = {
      email: undefined,
      password: undefined,
      password_confirm: undefined
    };

    $scope.submit = function () {
      $http
        .post('/api/v1/users.json', $scope.form)
        .then(function(response) {
          window.picker.user = response.data.user;

          flashesFactory.add('success', 'Created your account!');

          $location.path('/')
        })
        .catch(function(response) {
          var message = (response.data && response.data.error) ?
            response.data.error :
            'An error occurred.';

          flashesFactory.add('danger', message);
        });
    };

    $scope.ready();
  }
]);

