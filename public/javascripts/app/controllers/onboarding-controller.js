var app = angular.module('pickerApp');

app.controller('OnboardingController', [
  '$scope',
  '$http',
  '$location',
  'flashesFactory',
  function ($scope, $http, $location, flashesFactory) {

    

    $scope.clearJumbotron();

    $scope.ready();

    $('.option-select').on('click', function() {
      var count = $('.option-select.active').length;
      if ( $(this).hasClass('active') ) {
        count--;
      } else {
        count++;
      }
      if ( count < 1 ) {
        $('.plan').removeClass('highlight');
        $('#planA').addClass('highlight');
      } else if ( count < 3 ) {
        $('.plan').removeClass('highlight');
        $('#planB').addClass('highlight');
      } else if ( count < 5 ) {
        $('.plan').removeClass('highlight');
        $('#planC').addClass('highlight');
      } else {
        $('.plan').removeClass('highlight');
        $('#planD').addClass('highlight');
      }
    });
  }
]);
