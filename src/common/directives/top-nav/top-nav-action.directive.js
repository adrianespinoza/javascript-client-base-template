/**
 * @ngdoc directive
 * @name topNavAction
 * @requires $compile
 * @requires TemplateLoader
 * @requires breadcrumbsManager
 * @description
 *
 * Define the topNavAction directive. This directive a single action on a navigation bar.
 * It supports the following templates out of the bos:
 *  - normal: which is a normal link on the navigation bar
 *  - dropdown
 *  - button
 *
 * The model for each action is what defines the template that will be used, it also supports external templates
 * configured through the action model.
 *
 * Model Examples:
 *
    - Normal action:
        {
          text: 'Dashboard',
          name: 'dashboard', // The name of the action is used as a unique key
          icon: 'home', // The action template uses the icons from foundation 5, just specify the icon name
          visible: true,
          href: '#/dashboard'
        }

     -DropDown action with event handlers
       {
         text: 'Welcome',
         type: 'dropdown',
         icon: 'torso',
         visible: true, // this property is used by the parent of the action using a filter on a ng-repeat directive
         isVisible: function () { // The this method will be invoked by the nav action itself

         },
         customClass: 'user-nav-menu', // You can specify a custom class that will be applied to the action element
         actions: [
           {
             text:  'About',
             visible: true
           },
           {
             text:  'Settings',
             visible: true,
             icon: 'widget'
           },
           {
             text: 'Log out',
             visible: true,
             icon: 'power',
             divider: 'before',
             onClick: function () { // You can add an onClick event handler on any action

             }
           }
         ]
      }

     - Action with template specified (templateUrl can also be specified):
       {
         template: '<login></login>',
         visible: true,
         isVisible: function () {

         }
      }
 *
 * @example
 * <top-nav-action is-hover="{{ isHover }}" ng-repeat="action in navActions | filter:{visible:true}"
 *    nav-action="action" ></top-nav-action>
 */
angular.module('cidApp.directives').directive('topNavAction', [
  '$compile',
  'TemplateLoader',
  'breadcrumbsManager',
  function ($compile, TemplateLoader, breadcrumbsManager) {
    'use strict';
    var templateMap = {
        normal: 'common/directives/top-nav/top-nav-action.template.html',
        dropdown: 'common/directives/top-nav/top-nav-action-dropdown.template.html',
        button: 'common/directives/top-nav/top-nav-action-button.template.html'
      },
      dividerTemplate = '<li class="divider"></li>',
      linkFunction = function (scope, element) {
        // Loads the corresponding template according to the action model template type.
        var actionType = scope.navAction.type,
          dividerPos = scope.navAction.divider,
          templateLoader = new TemplateLoader(templateMap, 'normal');

        scope.isActive = function (action) {
          if (action.toState) {
            return breadcrumbsManager.includeState(action.toState);
          }
          if (action.href) {
            return action.name === breadcrumbsManager.getFirst().name;
          }
        };

        var configureTemplate = function (templateElement) {
          //Appends or prepends divider depending on the specified position
          switch (dividerPos) {
          case 'before':
            templateElement = angular.element('<div></div>')
              .append(dividerTemplate)
              .append(templateElement)
              .children();
            break;
          case 'after':
            templateElement = angular.element('<div></div>')
              .append(templateElement)
              .append(dividerTemplate)
              .children();
            break;
          }

          // add the ui-sref attribute of the anchor element if the toState property is defined
          if (scope.navAction.toState) {
            templateElement.children('a').attr('ui-sref', scope.navAction.toState);
          // add the href attribute of the anchor element if the href property is defined
          } else if (scope.navAction.href) {
            templateElement.children('a').attr('ng-href', scope.navAction.href);
          }

          // Adds smooth scroll directive
          if (scope.navAction.smoothScroll) {
            templateElement.children('a').attr('du-smooth-scroll', '');
            templateElement.children('a').attr('du-scrollspy', '');
            templateElement.children('a').attr('offset', scope.navAction.scrollOffset);
          }

          // Adds ng-if directive if action has a property: isVisible
          if (scope.navAction.isVisible) {
            templateElement.attr('ng-if', 'navAction.isVisible()');
          }

          element.replaceWith($compile(templateElement)(scope));
        };

        var promise;

        if (scope.navAction.template) {
          configureTemplate(angular.element(scope.navAction.template));
        } else {

          if (scope.navAction.templateUrl) {
            promise = templateLoader.loadTemplateFromUrl(scope.navAction.templateUrl);
          } else {
            promise = templateLoader.loadTemplate(actionType);
          }
          promise.then(configureTemplate);
        }

        scope.onActionClick = function (e) {
          if (scope.navAction.onClick) {
            scope.navAction.onClick(e);
          }
        };
      };

    return {
      replace: true,
      restrict: 'EA',
      scope: {
        isFirst: '=',
        navAction: '=',
        isHover: '@'
      },
      link: linkFunction
    };
  }]);
