angular.module('cidApp.mainDashboard').controller('MainDashboardController', [
  '$scope',
  '$location',
  'tilesArray',
  function ($scope, $location, tilesArray) {
    'use strict';
    $scope.tiles = tilesArray;
    $scope.notes = [];
  }
]);
