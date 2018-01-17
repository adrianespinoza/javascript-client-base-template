angular.module('cidApp.landingPage', ['ngRoute'])
  .config([
    '$stateProvider',
    function ($stateProvider) {
      'use strict';

      $stateProvider.state('landingPage', {
        url: '/',
        views: {
          'content': {
            templateUrl: 'modules/landing-page/landing-page.template.html',
            controller: 'LandingPageController'
          },
          'landingPageContent@landingPage': {
            templateUrl: 'modules/landing-page/landing-page-sections.template.html'
          }
          /*,
          'header': {
            templateUrl: 'modules/landing-page/landing-page-nav.template.html'
          }*/
        }
      }).state('xpressHelpPage', {
        parent: 'landingPage',
        url: '/helpPage',
        views: {
          'landingPageContent@landingPage': {
            controller: 'HelpPageController',
            templateUrl: 'modules/help-page/help-page.template.html'
          }
        }
      });
    }
  ]);
