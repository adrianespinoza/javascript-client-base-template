/**
 * @ngdoc service
 * @name TemplateLoader
 * @requires $http
 * @requires $templateCache
 * @description
 *
 * Service defining a TemplateLoader class, this entity allows the user to load templates dynamically based on
 * a template url or a templateMap (multiple template url mapped to a template type)
 *
 */
angular.module('cidApp.services').factory('TemplateLoader', [
  '$http',
  '$templateCache',
  function ($http, $templateCache) {
    'use strict';
    function TemplateLoader(templateMap, defaultTemplateType) {
      this.templateMap = templateMap || {};
      this.defaultTemplateType = defaultTemplateType || '';
    }

    TemplateLoader.prototype = {
      constructor: TemplateLoader,

      loadTemplate: function (templateType) {
        templateType = templateType || this.defaultTemplateType;
        var template = this.templateMap[templateType],
          promise;

        if (!template) {
          var msg = 'Invalid template type: ' + templateType;
          throw new Error(msg);
        }

        promise = this.loadTemplateFromUrl(template);

        return promise;
      },
      loadTemplateFromUrl: function (templateUrl) {
        var promise = $http.get(templateUrl, {cache: $templateCache})
          .then(function success(response) {
            return angular.element(response.data);
          }, function error(reason) {
            console.log(reason);
            throw new Error('Template not found: ' + templateUrl);
          });

        return promise;
      }
    };

    return TemplateLoader;
  }]);
