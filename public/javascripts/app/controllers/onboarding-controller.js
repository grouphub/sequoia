var app = angular.module('pickerApp');

app.controller('OnboardingController', [
  '$scope',
  '$http',
  '$location',
  'flashesFactory',
  function ($scope, $http, $location, flashesFactory) {

    

    $scope.clearJumbotron();

    $scope.ready();

    // Just to move the highlighted plan around
    $('.option-select').on('click', function() {
      var count = $('.option-select.active').length;
      if ( $(this).hasClass('active') ) {
        count--;
      } else {
        count++;
      }
      if ( count < 2 ) {
        $('.plan').removeClass('highlight');
        $('#planA').addClass('highlight');
      } else if ( count < 4 ) {
        $('.plan').removeClass('highlight');
        $('#planB').addClass('highlight');
      } else {
        $('.plan').removeClass('highlight');
        $('#planC').addClass('highlight');
      } 
    });
  }
]);
