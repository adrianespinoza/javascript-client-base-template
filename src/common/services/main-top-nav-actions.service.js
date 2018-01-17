angular.module('cidApp.services').factory('mainTopNavActions', [
  function () {
    'use strict';
    var mainTopNavActions = {};
    /*
     * CAUTION!  Make sure name & url are the SAME for you won't get the '::before' effects
     */

    /*Tile actions*/
    var actions = [
      {
        text: 'DASHBOARD',
        name: 'dashboard',
        visible: true,
        href: '#/dashboard'
      }
    ];

    /**
     * Template to handle authorization.
     * @returns {*[]}
     */
    mainTopNavActions.authorizedActions = function () {
      var authActions = actions;
      return authActions;
    };

    return mainTopNavActions;
  }
]);
