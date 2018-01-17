/**
 * @ngdoc service
 * @name modalBlockLoading
 * @description
 *
 * Service in charge of blocking/unblocking the screen with a modal element
 * (can be used while some process is waiting for)
 *
 */
angular.module('cidApp.services').factory('modalBlockLoading', [
  '$document',
  'TemplateLoader',
  '$compile',
  '$rootScope',
  '$timeout',
  function (
    $document,
    TemplateLoader,
    $compile,
    $rootScope,
    $timeout
  ) {
    'use strict';
    var templateMap = { tdefault: 'common/services/modal-block-loading/modal-block-loading.template.html' };
    var scope;
    var element;
    return {
      init : function () {
        if (!scope && !element) {
          scope = $rootScope.$new();
          var body = $document.find('body').eq(0);
          var templateLoader = new TemplateLoader(templateMap, 'tdefault');
          templateLoader.loadTemplate('tdefault')
            .then(function (templateElement) {
              var spinnerConfig = {
                radius: 35,
                width: 6,
                length: 10,
                color: '#CCCCCC',
                lines: 16,
                hwaccel: true,
                zIndex: 201
              };
              scope.spinnerConf = angular.toJson(spinnerConfig);
              scope.isActivated = false;
              element = $compile(templateElement)(scope);
              body.append(element);
            });
        }
      },
      show : function (message) {
        if (scope) {
          if (!message) {
            message = 'Loading';
          }
          scope.message = message;
          scope.isActivated = true;
        }
      },
      close : function () {
        if (scope) {
          scope.isActivated = false;
        }
      }
    };
  }
]);
