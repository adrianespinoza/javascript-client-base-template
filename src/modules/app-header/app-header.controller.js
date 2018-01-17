/**
 * @ngdoc object
 * @name AppHeaderController
 * @requires $scope
 * @requires $location
 * @requires mainTopNavActions
 * @description
 *
 * Controls the header area of the application, exposes the navigation actions on the scope
 */
angular.module('cidApp.appHeader').controller('AppHeaderController', [
  '$scope',
  '$location',
  'mainTopNavActions',
  function ($scope, $location, mainTopNavActions) {
    'use strict';

    $scope.topNavActionsGroup = {
      topBar: {
        right: {}
      },
      subBar: {
        left: mainTopNavActions.authorizedActions()
      }
    };
  }
]);
