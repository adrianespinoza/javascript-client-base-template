angular.module('cidApp.directives')
  .directive('pageSections', [function () {
    'use strict';
    return {
      templateUrl: 'common/directives/page-sections/page-sections.template.html',
      restrict: 'EA',
      transclude: true,
      replace: true,
      link: function (scope, el, attrs) {
        var sections = [];
        scope.sectionArray.map(function (section) {
          if (section.isRendering === true) {
            sections.push(section);
          }
        });
        scope.sectionArray = sections;
      }
    };
  }]);