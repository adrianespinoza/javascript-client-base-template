angular.module('cidApp.mainDashboard', [
  'ngRoute'
]).config([
  '$stateProvider',
  function ($stateProvider) {
    'use strict';

    $stateProvider.state('app.mainDashboard', {
      url: '/dashboard',
      parent: 'app',
      data: {
        stateTitle: 'Dashboard'
      },
      views: {
        'content@': {
          controller: 'MainDashboardController',
          templateUrl: 'modules/main-dashboard/main-dashboard.template.html',
          resolve: {
            tilesArray: [
              function () {
                var tiles = [
                  {
                    id: 1,
                    title: 'Create Project',
                    desc: 'Get started creating a SID project.',
                    cls: 'ion-android-settings',
                    links: [
                      {
                        link: '#/adminDashboard',
                        accessLevelCode: [0]
                      }
                    ]
                  }
                ];

                return tiles;
              }
            ]
          }
        }
      }
    });
  }
]);
