angular.module('cidApp.directives')
  .directive('sectionContainer',
    ['$location', 'TemplateLoader', '$compile',
      function ($location, TemplateLoader, $compile) {
        'use strict';
        return {
          templateUrl: 'common/directives/page-sections/section-container.template.html',
          restrict: 'EA',
          replace: true,
          link: function (scope, el, attrs) {
            var transcludeElement,
              domTranscludeElement,
              templateLoader,
              templateMap,
              section = scope.section;

            if (section.transcludeContentUrl) {
              templateMap = { tdefault: section.transcludeContentUrl };
              if (scope.condition && section.optionalTranscludeContentUrl) {
                templateMap = { tdefault: section.optionalTranscludeContentUrl };
              }
              templateLoader = new TemplateLoader(templateMap, 'tdefault');
              transcludeElement = el.children().children().children().eq(2);
              domTranscludeElement = angular.element(transcludeElement);

              templateLoader.loadTemplate('tdefault')
                .then(function (templateElement) {
                  domTranscludeElement.append($compile(templateElement)(scope));
                });
            }
          }
        };
      }]);