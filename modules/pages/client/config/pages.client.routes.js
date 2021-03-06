(function () {
  'use strict';

  angular
    .module('pages')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('pages', {
        abstract: true,
        url: '/pages',
        template: '<ui-view/>'
      })
      .state('admin.pages', {
        abstract: true,
        url: '/pages',
        template: '<ui-view/>'
      })
      .state('admin.pages.list', {
        url: '',
        templateUrl: '/modules/pages/client/views/list-pages.client.view.html',
        controller: 'PagesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Pages'
        }
      })
      .state('admin.pages.create', {
        url: '/create',
        templateUrl: '/modules/pages/client/views/form-page.client.view.html',
        controller: 'PagesController',
        controllerAs: 'vm',
        resolve: {
          pageResolve: newPage
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'New Page'
        }
      })
      .state('admin.pages.edit', {
        url: '/:pageId/edit',
        templateUrl: '/modules/pages/client/views/form-page.client.view.html',
        controller: 'PagesController',
        controllerAs: 'vm',
        resolve: {
          pageResolve: getPage
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Page {{ pageResolve.title }}'
        }
      })
      .state('pages.view', {
        url: '/:slug',
        templateUrl: '/modules/pages/client/views/view-page.client.view.html',
        controller: 'PagesController',
        controllerAs: 'vm',
        resolve: {
          pageResolve: getPageBySlug
        },
        data: {
          pageTitle: '{{ pageResolve.title }}'
        }
      });
  }

  getPage.$inject = ['$stateParams', 'PagesService'];

  function getPage($stateParams, PagesService) {
    return PagesService.get({
      pageId: $stateParams.pageId
    }).$promise;
  }

  function getPageBySlug($stateParams, PagesService) {
    return PagesService.getBySlug({
      slug: $stateParams.slug
    }).$promise;
  }

  newPage.$inject = ['PagesService'];

  function newPage(PagesService) {
    return new PagesService();
  }
}());
