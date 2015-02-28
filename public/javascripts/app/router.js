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
      .when('/plans', {
        templateUrl: '/templates/plans.html',
        controller: 'PlansController'
      })
      .when('/signup', {
        templateUrl: '/templates/signup.html',
        controller: 'SignupController'
      })
      .when('/basic', {
        templateUrl: '/templates/basic.html',
        controller: 'BasicController'
      })
      .when('/doctors', {
        templateUrl: '/templates/doctors.html',
        controller: 'DoctorsController'
      })
      .when('/recommendations', {
        templateUrl: '/templates/recommendations.html',
        controller: 'RecommendationsController'
      })
      .when('/details', {
        templateUrl: '/templates/details.html',
        controller: 'DetailsController'
      })
      .when('/success', {
        templateUrl: '/templates/success.html',
        controller: 'SuccessController'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true)
  }
]);

