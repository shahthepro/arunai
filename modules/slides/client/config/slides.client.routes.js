(function () {
  'use strict';

  angular
    .module('slides')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.slides', {
        abstract: true,
        url: '/slides',
        template: '<ui-view/>'
      })
      .state('admin.slides.list', {
        url: '',
        templateUrl: 'modules/slides/client/views/list-slides.client.view.html',
        controller: 'SlidesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Slides List'
        }
      })
      .state('admin.slides.create', {
        url: '/create',
        templateUrl: 'modules/slides/client/views/form-slide.client.view.html',
        controller: 'SlidesController',
        controllerAs: 'vm',
        resolve: {
          slideResolve: newSlide
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Slides Create'
        }
      })
      .state('admin.slides.edit', {
        url: '/:slideId/edit',
        templateUrl: 'modules/slides/client/views/form-slide.client.view.html',
        controller: 'SlidesController',
        controllerAs: 'vm',
        resolve: {
          slideResolve: getSlide
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Slide {{ slideResolve.name }}'
        }
      });
  }

  getSlide.$inject = ['$stateParams', 'SlidesService'];

  function getSlide($stateParams, SlidesService) {
    return SlidesService.get({
      slideId: $stateParams.slideId
    }).$promise;
  }

  newSlide.$inject = ['SlidesService'];

  function newSlide(SlidesService) {
    return new SlidesService();
  }
}());
