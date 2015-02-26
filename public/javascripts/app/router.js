var app = angular.module('pickerApp');

app.config([
  '$routeProvider',
  '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/home.html',
        controller: 'HomeController'
      })
      .when('/plans', {
        templateUrl: '/templates/plans.html',
        controller: 'PlansController'
      })
      .when('/users/signin', {
        templateUrl: '/templates/users/signin.html',
        controller: 'UsersSigninController'
      })
      .when('/users/new', {
        templateUrl: '/templates/users/new.html',
        controller: 'UsersNewController'
      })
      .when('/users/:userId', {
        templateUrl: '/templates/users/show.html',
        controller: 'UsersShowController'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true)
  }
]);

