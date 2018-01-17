    /**
 * @ngdoc directive
 * @name topNav
 * @requires $compile
 * @requires $timeout
 * @description
 *
 * Define the topNav directive.
 *
 * @example
 * <top-nav app-title="App Title" css-class="top-bar" is-hover="false" href="/" nav-actions="topNavActions"></top-nav>
 */
angular.module('cidApp.directives').directive('topNav', [
  '$compile',
  '$timeout',
  function ($compile, $timeout) {
    'use strict';
    var linkFunction = function (scope, element) {
      var elementHeight;
      $timeout(function () {
        var bodyPaddingTop = parseInt($('body').css('padding-top').slice(0, -2), 10);
        elementHeight = $(element[0]).children('nav').outerHeight();
        $('body').css('padding-top', (bodyPaddingTop + elementHeight) + 'px');
      });

      scope.$on('$destroy', function () {
        var bodyPaddingTop = parseInt($('body').css('padding-top').slice(0, -2), 10);
        $('body').css('padding-top', (bodyPaddingTop - elementHeight) + 'px');
      });
    };

    return {
      restrict: 'EA',
      scope: {
        appTitle: '@', // string that specifies the title that will be shown on the left side, can be empty
        titleHref: '@', // this will be the href for the title anchor tag,
        imageHref: '@', // this will be the href for the image anchor tag,
        hasImage: '@', // string, 'true' to indicate that a image will be used for the nav appTitle
        cssClass: '@', // the main css class that will be applied to the <nav> element.
        //TODO: Add support for sticky top navigation bar
        type: '@', // Supports 'fixed', 'sticky' or leave empty for normal
        //TODO: Refactor this to align all the nav actions into the grid
        containToGrid: '@', //Boolean, specifies whether the nav should take the whole page width or not.
        isHover: '@', //Boolean, specifies whether the drop downs will expand on hover or on click
        navActions: '=' //MUST contain an object with two properties 'left' and 'right',
                        //which hold arrays to the actions
      },
      templateUrl: 'common/directives/top-nav/top-nav.template.html',
      link: linkFunction
    };
  }]);