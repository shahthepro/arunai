(function () {
  'use strict';

  angular.module('core')
    .directive('pageTitle', pageTitle)
    .directive('pageHeader', pageHeader);

  pageTitle.$inject = ['$rootScope', '$interpolate', '$state'];
  pageHeader.$inject = ['$rootScope', '$interpolate', '$state'];

  function pageTitle($rootScope, $interpolate, $state) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, element) {
      $rootScope.$on('$stateChangeSuccess', listener);

      function listener(event, toState) {
        var applicationCoreTitle = 'Arunai Engineering College',
          separeteBy = ' - ';
        if (toState.data && toState.data.pageTitle) {
          var stateTitle = $interpolate(toState.data.pageTitle)($state.$current.locals.globals);
          element.html(applicationCoreTitle + separeteBy + stateTitle);
        } else {
          element.html(applicationCoreTitle);
        }
      }
    }
  }

  function pageHeader($rootScope, $interpolate, $state) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, element) {
      $rootScope.$on('$stateChangeSuccess', listener);

      function listener(event, toState) {
        var applicationCoreTitle = 'Arunai Engineering College',
          separeteBy = ' - ';
        if (toState.data && toState.data.pageTitle) {
          var stateTitle = $interpolate(toState.data.pageTitle)($state.$current.locals.globals);
          element.html(stateTitle);
        } else {
          element.html(applicationCoreTitle);
        }
      }
    }
  }
}());
