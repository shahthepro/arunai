(function () {
  'use strict';

  angular
    .module('core.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        template: '<ui-view/>',
        data: {
          roles: ['student', 'professor', 'hod', 'admin']
        }
      })
      .state('admin.dashboard', {
        url: '',
        templateUrl: '/modules/core/client/views/home.client.view.html',
        // controller: 'AdminDashboardController',
        controller: 'HomeController',
        controllerAs: 'vm',
        data: {
          roles: ['student', 'professor', 'hod', 'admin']
        }
      });
  }
}());
