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
          pageTitle: 'Course Assignments'
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
          pageTitle: 'Assign Courses'
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
          pageTitle: 'Update Course Assignment'
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
