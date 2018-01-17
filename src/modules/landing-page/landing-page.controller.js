angular.module('cidApp.landingPage').controller('LandingPageController', [
  '$scope',
  'appInfo',
  function ($scope, appInfo) {
    'use strict';
    $scope.headerActions = {
      right: appInfo.getHeaderActions()
    };
    $scope.sectionArray = appInfo.getSections();

    /**
     * To know that the user is living and show the correct landing page.
     * @type {string}
     */
    $scope.condition = undefined;

    /**
     * Redirect to correct dashboard from landing page when a user is living.
     * @return {string} Page path.
     */
    $scope.getRedirectPath = function () {
      // Logic to redirect to correct page according user role using a variable path.
      return '#/dashboard';
    };
  }
]);
