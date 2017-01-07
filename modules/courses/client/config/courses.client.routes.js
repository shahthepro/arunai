(function () {
  'use strict';

  angular
    .module('courses.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.courses', {
        abstract: true,
        url: '/courses',
        template: '<ui-view/>'
      })
      .state('admin.courses.list', {
        url: '',
        templateUrl: '/modules/courses/client/views/list-courses.client.view.html',
        controller: 'CoursesListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: 'Courses List'
        }
      })
      .state('admin.courses.create', {
        url: '/create',
        templateUrl: '/modules/courses/client/views/form-course.client.view.html',
        controller: 'CoursesController',
        controllerAs: 'vm',
        resolve: {
          courseResolve: newCourse
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Courses Create'
        }
      })
      .state('admin.courses.edit', {
        url: '/:courseId/edit',
        templateUrl: '/modules/courses/client/views/form-course.client.view.html',
        controller: 'CoursesController',
        controllerAs: 'vm',
        resolve: {
          courseResolve: getCourse
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit Course {{ courseResolve.name }}'
        }
      });
  }

  getCourse.$inject = ['$stateParams', 'CoursesService'];

  function getCourse($stateParams, CoursesService) {
    return CoursesService.get({
      courseId: $stateParams.courseId
    }).$promise;
  }

  newCourse.$inject = ['CoursesService'];

  function newCourse(CoursesService) {
    return new CoursesService();
  }
}());
