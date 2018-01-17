/**
 * @ngdoc service
 * @name erroHandler
 * @requires $injector
 * @requires userInfo
 * @requires growl
 * @description
 *
 * Service in charge of managing global errors throughout the application
 *
 * Does the following:
 *  - If it received  an 401 Unauthorized, it redirects the user to the landing page and cleans the web storage,
 *    as well as displaying an alert.
 *  - For the codes 500, 404 and 422 displays an alert message
 *
 */
angular.module('cidApp.services').factory('errorHandler', [
  '$injector',
  'growl',
  function ($injector, growl) {
    'use strict';

    var httpMessageMap = {
      // net::ERR_CONNECTION_REFUSED 
      0: {
        message: 'Connection refused, we are experiencing difficulties.' +
          ' Please contact with the administrator.',
        type: 'danger'
      },
      // Unauthorized (authentication error)
      401: {
        message: 'Your session is not valid or has expired. Please log in again.',
        type: 'danger'
      },
      // Unauthorized (authorization error)
      403: {
        message: 'You don\'t have the right permissions to access this resource.' +
          ' Please contact with the administrator.',
        type: 'warning'
      },
      // Not Found
      404: {
        message: 'The page resources are not valid anymore or connection refused.' +
          ' Please contact with the administrator.',
        type: 'danger'
      },
      // Internal Server Error
      500: {
        message: 'We are experiencing difficulties. Please contact with the administrator.',
        type: 'danger'
      },
      // Unprocessable Entity
      422: {
        type: 'warning'
      }
    };

    var httpActionMap = {
      // Unauthorized (authentication error)
      401: function () {
        $injector.get('$state').go('landingPage', null, {reload: true});
      }
    };

    var stateActionMapConfig = {
      /* Example */
      // 'state' : {
      // 'apply': ['404', '500'], //If It's not specified assume all codes are applied
      // 'except': ['401', '403']
      // }
    };

    var stateMessageMapConfig = {
      'landingPage' : {
        //'apply': ['403', '404', '500'], //If It's not specified assume all codes are applied
        'except': ['401', '403']
      }
    };

    var isApplicable = function (code, state, configMap, httpMap) {
      if (state && state.current) {
        var stateName = state.current.name;
        var config = configMap[stateName];
        if (config) {
          var codeArray = config.apply;
          var codeExceptionArray = config.except;
          if (!codeArray) {
            codeArray = Object.keys(httpMap);
          }
          if (codeExceptionArray) {
            var i;
            for (i = 0; i < codeExceptionArray.length; ++i) {
              codeArray.splice(codeArray.indexOf(codeExceptionArray[i]), 1);
            }
          }
          return codeArray.indexOf(code) !== -1;
        }
      }
      return true;
    };

    var hasToApplyAction = function (code, state) {
      return isApplicable(code, state, stateActionMapConfig, httpActionMap);
    };

    var hasToShowMessage = function (code, state) {
      return isApplicable(code, state, stateMessageMapConfig, httpMessageMap);
    };

    var showMessage = function (code, state, message) {
      var messageConf = httpMessageMap[code];
      if (messageConf && hasToShowMessage(code, state)) {
        var textMessage = messageConf.message;
        if (message) {
          textMessage = message;
        }
        if (textMessage) {
          switch (messageConf.type) {
          case 'danger':
            growl.addErrorMessage(textMessage);
            break;
          case 'warning':
            growl.addWarnMessage(textMessage);
            break;
          case 'info':
            growl.addInfoMessage(textMessage);
            break;
          case 'success':
            growl.addSuccessMessage(textMessage);
            break;
          }
        }
      }
    };

    var applyAction = function (code, state) {
      var handled = false;
      var actionHandler = httpActionMap[code];
      if (actionHandler && hasToApplyAction(code, state)) {
        actionHandler();
        handled = true;
      }
      return handled;
    };

    return {
      manageHttpCode : function (statusCode, state, message) {
        var handled = false;
        statusCode = statusCode.toString();
        handled = applyAction(statusCode, state);
        showMessage(statusCode, state, message);
        return handled;
      }
    };
  }
]);
