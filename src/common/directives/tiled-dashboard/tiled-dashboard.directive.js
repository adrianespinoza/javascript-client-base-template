angular.module('cidApp.directives').directive('tiledDashboard', [
  function () {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: "common/directives/tiled-dashboard/tiled-dashboard.template.html",
      replace: true,
      scope: {
        model: '=ngTiles',
        dashWidth: '=ngDashWidth',
        dashTitle: '=ngDashTitle'
      }
    };
  }
]);
