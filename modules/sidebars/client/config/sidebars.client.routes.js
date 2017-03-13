(function () {
  'use strict';

  angular
    .module('sidebars')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('sidebars', {
        abstract: true,
        url: '/sidebars',
        template: '<ui-view/>'
      })
      .state('sidebars.list', {
        url: '',
        templateUrl: 'modules/sidebars/client/views/list-sidebars.client.view.html',
        controller: 'SidebarsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Sidebars List'
        }
      })
      .state('sidebars.create', {
        url: '/create',
        templateUrl: 'modules/sidebars/client/views/form-sidebar.client.view.html',
        controller: 'SidebarsController',
        controllerAs: 'vm',
        resolve: {
          sidebarResolve: newSidebar
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Sidebars Create'
        }
      })
      .state('sidebars.edit', {
        url: '/:sidebarId/edit',
        templateUrl: 'modules/sidebars/client/views/form-sidebar.client.view.html',
        controller: 'SidebarsController',
        controllerAs: 'vm',
        resolve: {
          sidebarResolve: getSidebar
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Sidebar {{ sidebarResolve.name }}'
        }
      })
      .state('sidebars.view', {
        url: '/:sidebarId',
        templateUrl: 'modules/sidebars/client/views/view-sidebar.client.view.html',
        controller: 'SidebarsController',
        controllerAs: 'vm',
        resolve: {
          sidebarResolve: getSidebar
        },
        data: {
          pageTitle: 'Sidebar {{ sidebarResolve.name }}'
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
