(function () {
  'use strict';

  angular
    .module('sidebars')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.sidebars', {
        abstract: true,
        url: '/sidebars',
        template: '<ui-view/>'
      })
      .state('admin.sidebars.list', {
        url: '',
        templateUrl: '/modules/sidebars/client/views/list-sidebars.client.view.html',
        controller: 'SidebarsListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: 'Sidebars'
        }
      })
      .state('admin.sidebars.create', {
        url: '/create',
        templateUrl: '/modules/sidebars/client/views/form-sidebar.client.view.html',
        controller: 'SidebarsController',
        controllerAs: 'vm',
        roles: ['admin'],
        resolve: {
          sidebarResolve: newSidebar
        },
        data: {
          roles: ['admin'],
          pageTitle: 'New Sidebar'
        }
      })
      .state('admin.sidebars.edit', {
        url: '/:sidebarId/edit',
        templateUrl: '/modules/sidebars/client/views/form-sidebar.client.view.html',
        controller: 'SidebarsController',
        controllerAs: 'vm',
        resolve: {
          sidebarResolve: getSidebar
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit Sidebar {{ sidebarResolve.name }}'
        }
      });
  }

  getSidebar.$inject = ['$stateParams', 'SidebarsService'];

  function getSidebar($stateParams, SidebarsService) {
    return SidebarsService.get({
      sidebarId: $stateParams.sidebarId
    }).$promise;
  }

  newSidebar.$inject = ['SidebarsService'];

  function newSidebar(SidebarsService) {
    return new SidebarsService();
  }
}());
