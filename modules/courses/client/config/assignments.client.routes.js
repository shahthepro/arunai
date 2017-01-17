(function () {
  'use strict';

  angular
    .module('courses.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.assignments', {
        abstract: true,
        url: '/assignments',
        template: '<ui-view/>'
      })
      .state('admin.assignments.list', {
        url: '',
        templateUrl: '/modules/courses/client/views/list-assignments.client.view.html',
        controller: 'AssignmentsListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'hod'],
          pageTitle: 'Course Assignments List'
        }
      })
      .state('admin.assignments.create', {
        url: '/create',
        templateUrl: '/modules/courses/client/views/form-assignment.client.view.html',
        controller: 'AssignmentsController',
        controllerAs: 'vm',
        resolve: {
          assignmentResolve: newAssignment
        },
        data: {
          roles: ['admin', 'hod'],
          pageTitle: 'Create Course Assignmentss'
        }
      })
      .state('admin.assignments.edit', {
        url: '/:assignmentId/edit',
        templateUrl: '/modules/courses/client/views/form-assignment.client.view.html',
        controller: 'AssignmentsController',
        controllerAs: 'vm',
        resolve: {
          assignmentResolve: getAssignment
        },
        data: {
          roles: ['admin', 'hod'],
          pageTitle: 'Edit Assignment'
        }
      });
  }

  getAssignment.$inject = ['$stateParams', 'AssignmentsService'];

  function getAssignment($stateParams, AssignmentsService) {
    return AssignmentsService.get({
      assignmentId: $stateParams.assignmentId
    }).$promise;
  }

  newAssignment.$inject = ['AssignmentsService'];

  function newAssignment(AssignmentsService) {
    return new AssignmentsService();
  }
}());
