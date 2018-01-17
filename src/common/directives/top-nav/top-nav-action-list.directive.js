/**
 * @ngdoc directive
 * @name topNavActionList
 * @requires $compile
 * @description
 *
 * Define the topNavActionsList directive. This directive holds a set of actions/links
 *
 * @example
 * <top-nav-action-list is-hover="{{ isHover }}" position="right" nav-actions="navActions.right"></top-nav-action-list>
 */
angular.module('cidApp.directives').directive('topNavActionList', [
  '$compile',
  function ($compile) {
    'use strict';
    var linkFunction = function (scope, element, attrs) {
      // Shows the dropdown on click instead of on hover
      if (scope.isHover !== 'true' && scope.isNested === 'true') {
        element.attr('dropdown-list', '');
        $compile(element)(scope);
      }
    };

    return {
      restrict: 'EA',
      replace: true,
      scope: {
        position: '@', // support 'left', 'right'
        navActions: '=',
        isNested: '@', //'true' or 'false', if set to true, the position is ignored because the <ul> element is nested
        isHover: '@' // 'true' or 'false, if set to true, a class will be applied to the dropdowns to expand on hover
      },
      templateUrl: 'common/directives/top-nav/top-nav-action-list.template.html',
      link: linkFunction
    };
  }]);