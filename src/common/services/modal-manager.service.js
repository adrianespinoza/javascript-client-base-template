/**
 * @ngdoc service
 * @name modalManager
 * @description
 *
 * Service used to dismiss modal instances that is handled by this service.
 *
 */
angular.module('cidApp.services').factory('modalManager', [
  function () {
    'use strict';

    var modalManager = {};
    var modalCollector = {};

    /**
     * Function that save a modal instance.
     * @param {string} key The modal instance key.
     * @param {object} value The modal instance.
     * */
    modalManager.put = function (key, value) {
      modalCollector[key] = value;
    };

    /**
     * Function that gets a modal instance.
     * @param {string} key The modal instance key.
     * */
    modalManager.get = function (key) {
      return modalCollector[key];
    };

    /**
     *
     * */
    modalManager.nullify = function (key) {
      if (modalCollector[key]) {
        modalCollector[key] = undefined;
      }
    };

    /**
     * Function that gets all modal instances.
     * */
    modalManager.getCollector = function () {
      return modalCollector;
    };

    /**
     * Function that kills a modal instance.
     * @param {string} key The modal instance key.
     * */
    modalManager.dismiss = function (key) {
      if (modalCollector[key]) {
        modalCollector[key].dismiss('cancel');
        modalCollector[key] = undefined;
      }
    };

    /**
     * Function that kills all modal instances.
     * */
    modalManager.dismissAll = function () {
      if (!angular.equals(modalCollector, {})) {
        angular.forEach(modalCollector, function (value, key) {
          modalManager.dismiss(key);
        });
        modalCollector = {};
      }
    };

    /**
     * Function that sets all modals to null.
     * */
    modalManager.nullifyAll = function () {
      if (!angular.equals(modalCollector, {})) {
        angular.forEach(modalCollector, function (value, key) {
          modalManager.nullify(key);
        });
        modalCollector = {};
      }
    };

    return modalManager;
  }
]);