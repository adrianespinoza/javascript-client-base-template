/**
 * @ngdoc service
 * @name breadcrumbsManager
 * @requires $rootScope
 * @requires $location
 * @requires $state
 * @description
 *
 * Service defining an object that represents the breadcrumbs of the application
 *
 * Holds a reference to the current state to access the data object exposing a title and description property
 * that can used for each state/page
 *
 */
angular.module('cidApp.services').factory('breadcrumbsManager', ['$rootScope', '$location', '$state',
  function ($rootScope, $location, $state) {
    'use strict';

    var breadcrumbs = [],
      breadcrumbsService = {},
      currentState;

    // Setups the breadcrumbs object using the $location service
    var setupBreadcrumbs = function (current) {
      var pathElements = $location.path().split('/'),
        result = [],
        i,
        breadcrumbPath = function (index) {
          return (pathElements.slice(0, index + 1)).join('/');
        };

      pathElements.shift();
      if (pathElements.length === 1 && pathElements[0] === "") {
        pathElements.shift();
      }

      for (i = 0; i < pathElements.length; i++) {
        result.push({name: pathElements[i], path: breadcrumbPath(i)});
      }
      breadcrumbs = result;
      if (current) {
        currentState = current;
      }
    };

    var buildStateElement = function (stateConfig, params) {
      var data = stateConfig.data;
      if (data.stateTitle) {
        var stateElement = {
          title: data.stateTitle,
          isSelfRef : data.isSelfRef
        };
        if (data.isSelfRef) {
          var sref = stateConfig.name +
            '(' + angular.toJson(params) + ')';
          stateElement.sref = sref;
        }
        return stateElement;
      }
      return null;
    };

    var buildStateArray = function () {
      var stateConfig = $state.current;
      var params = $state.params;
      var stateArray = [];
      var stateElement, rootLevelOffset = 0, i;

      if (stateConfig.data && stateConfig.data.rootLevelOffset) {
        rootLevelOffset = stateConfig.data.rootLevelOffset;
      }

      while (stateConfig.parent) {
        stateElement = buildStateElement(stateConfig, params);
        if (stateElement) {
          stateArray.unshift(stateElement);
        }
        stateConfig = $state.get(stateConfig.parent);
      }
      if (rootLevelOffset < 0) {
        rootLevelOffset = -rootLevelOffset;
        for (i = 0; i < rootLevelOffset; ++i) {
          stateArray.unshift({
            title: ''
          });
        }
      } else if (rootLevelOffset > 0) {
        stateArray.splice(0, rootLevelOffset);
      }
      return stateArray;
    };

    // The breadcrumbs must be updated on every route change
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      setupBreadcrumbs(toState);
    });

    breadcrumbsService.buildStateArray = buildStateArray;

    $rootScope.$on('$viewContentLoaded', function (event, viewConfig) {
      setupBreadcrumbs($state.current);
    });

    // Breadcrumbs service methods
    breadcrumbsService.getAll = function () {
      return breadcrumbs;
    };

    breadcrumbsService.getFirst = function () {
      return breadcrumbs[0] || {};
    };

    breadcrumbsService.getLast = function () {
      return breadcrumbs[breadcrumbs.length - 1] || {};
    };

    breadcrumbsService.getByIndex = function (index) {
      return breadcrumbs[index] || {};
    };

    breadcrumbsService.getStateTitle = function () {
      if (currentState && currentState.data) {
        return currentState.data.stateTitle;
      }
      return;
    };

    breadcrumbsService.setStateTitle = function (value) {
      if (currentState && currentState.data) {
        currentState.data.stateTitle = value;
      }
    };

    breadcrumbsService.getStateDescription = function () {
      if (currentState && currentState.data) {
        return currentState.data.stateDescription;
      }
      return;
    };

    breadcrumbsService.setStateDescription = function (value) {
      if (currentState && currentState.data) {
        currentState.data.stateDescription = value;
      }
    };

    breadcrumbsService.includeState = function (stateName) {
      return $state.includes(stateName);
    };


    setupBreadcrumbs();

    return breadcrumbsService;
  }]);
