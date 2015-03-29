var app = angular.module('pickerApp');

app.controller('RecordsController', [
  '$scope',
  '$http',
  '$location',
  'flashesFactory',
  function ($scope, $http, $location, flashesFactory) {

    $scope.clearJumbotron();

    $scope.ready();

    $('.option-select').on('click', function() {
      if ( $(this).children().children().is('#dr') ) {
        $('#drs').addClass('active');
        $('#hospitals').removeClass('active');
        $('#immunizations').removeClass('active');
      } else if ( $(this).children().children().is('#hospital') ) {
        $('#drs').removeClass('active');
        $('#hospitals').addClass('active');
        $('#immunizations').removeClass('active');
      } else if ( $(this).children().children().is('#immunization') ) {
        $('#drs').removeClass('active');
        $('#hospitals').removeClass('active');
        $('#immunizations').addClass('active');
      }
    });
  }
]);
