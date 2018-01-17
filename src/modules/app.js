angular.module('cidApp.filters', []);

angular.module('cidApp.providers', []);

angular.module('cidApp.services', [
  'ngRoute',
  'ui.router',
  'ngResource'
]);

angular.module('cidApp.controllers', [
  'mm.foundation',
  'cidApp.services',
  'cidApp.providers'
]);

angular.module('cidApp.directives', [
  'ngRoute',
  'ui.utils',
  'mm.foundation',
  'cidApp.services',
  'cidApp.providers',
  'angular-growl',
  'angularFileUpload'
]);

angular.module('cidApp', [
  'ui.router',
  'ui.tree',
  'ngRoute',
  'ngTable',
  'duScroll',
  'mm.foundation',
  'LocalStorageModule',
  'angular.filter',
  'angular-growl',
  'angularSpinner',
  'angularFileUpload',
  'checklist-model',
  'ui.select',
  'ui.select2',
  'ngTagsInput',
  'cidApp.directives',
  'cidApp.controllers',
  'cidApp.services',
  'cidApp.providers',
  'cidApp.landingPage',
  'cidApp.appHeader',
  'cidApp.mainDashboard'
]).config([
  '$stateProvider',
  '$httpProvider',
  '$urlRouterProvider',
  'growlProvider',
  'growlProvider',
  function ($stateProvider, $httpProvider, $urlRouterProvider, growlProvider) {
    'use strict';
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('app', {
        url: '',
        abstract: true,
        views: {
          'header': {
            templateUrl: 'modules/app-header/app-header.template.html',
            controller: 'AppHeaderController'
          }
        }
      });
    growlProvider.globalTimeToLive(7000);
  }
]).run([
  '$window',
  '$state',
  '$rootScope',
  '$location',
  '$urlRouter',
  'modalBlockLoading',
  'modalManager',
  'growl',
  function (
    $window,
    $state,
    $rootScope,
    $location,
    $urlRouter,
    modalBlockLoading,
    modalManager,
    growl
  ) {
    // register listener to watch route changes
    'use strict';

    modalBlockLoading.init(); //always at the begin

    var noSessionStates = ['landingPage', 'app.mainDashboard'];

    var appJustOpened = true;

    var cleanUserInfoShowExpirationMessage = function () {
      if (!appJustOpened) {
        growl.addWarnMessage('Your session is not valid or has expired. Please log in again.');
      }
    };

    var correctModalBlockService = function () {
      try {
        modalManager.dismissAll();//mm-foundation throw an exception if the manager tries to dismiss a hide modal
      } catch (e) {
        modalManager.nullifyAll();
      }
      modalBlockLoading.show();
    };

    var validateUserNavigation = function (event, toState) {
      var hasValidData = true;
      if (!hasValidData) {
        cleanUserInfoShowExpirationMessage();
        if (noSessionStates.indexOf(toState.name) === -1) {
          event.preventDefault();
          $state.go('landingPage', null, {reload: true});
          return;
        }
      }
    };

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
      //console.log('toState', toState);
      //console.log('toParams', toParams);
      correctModalBlockService();
      validateUserNavigation(event, toState);
      if (appJustOpened) {
        appJustOpened = false;
      }
    });

    $rootScope.$on("$stateChangeSuccess", function (event, next, current) {
      correctModalBlockService();
      modalBlockLoading.close();
    });

    ////TODO: Remove this. It is causing duplicate the requests
    //$rootScope.$on('$locationChangeSuccess', function (evt) {
    //  //$urlRouter.sync();
    //});

    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
      correctModalBlockService();
      modalBlockLoading.close();
      console.log('$stateChangeError', error);
    });
  }
]);
