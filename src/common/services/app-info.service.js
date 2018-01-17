angular.module('cidApp.services').factory('appInfo', [
  function () {
    'use strict';

    var info = {};
    var appInfo = {};
    var defaultStateAfterLogin = 'app.mainDashboard';

    info.sections = [];
    info.sections[0] = {
      sectionId: 'presentation',
      title: '',
      content: '',
      type: 'odd',
      transcludeContentUrl: 'modules/landing-page/partials/main-content.template.html',
      optionalTranscludeContentUrl: 'modules/landing-page/partials/main-content-user.template.html',
      isRendering: true
    };

    info.sections[1] = {
      sectionId: 'what-is-sid',
      title: 'Information',
      content: 'SID generator information...',
      type: 'main',
      isRendering: true
    };

    info.headerActions = [
      {
        text: 'More Information',
        name: 'link1',
        visible: true,
        href: '#' + info.sections[1].sectionId,
        smoothScroll: true,
        scrollOffset: 45
      },
      {
        template: ' ' +
          '<li>' +
            '<a  class="button ghost radius" ui-sref="app.mainDashboard">' +
              '<i class="fa fa-cogs"> </i> Get Started' +
            '</a>' +
          '</li>',
        visible: true
      },
      {
        template: '<li class="has-form login"><login class-attr="button ghost radius"></login></li>',
        visible: false,
        isVisible: function () {
          return true;
        }
      }
    ];

    appInfo.getSections = function () {
      return info.sections;
    };

    appInfo.getHeaderActions = function () {
      return info.headerActions;
    };

    appInfo.getDefaultStateAfterLogin = function () {
      return defaultStateAfterLogin;
    };

    appInfo.getAppName = function () {
      return 'SID';
    };

    appInfo.getAppCopyright = function () {
      return '&#169 2014 PROS, Inc.';
    };

    return appInfo;
  }
]);
