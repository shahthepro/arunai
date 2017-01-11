(function () {
  'use strict';

  angular
    .module('attendances.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.attendances', {
        abstract: true,
        url: '/attendances',
        template: '<ui-view/>'
      })
      .state('admin.attendances.list', {
        url: '',
        templateUrl: '/modules/attendances/client/views/list-attendances.client.view.html',
        controller: 'AttendancesListController',
        controllerAs: 'vm',
        data: {
          roles: ['professor', 'admin'],
          pageTitle: 'Attendances List'
        }
      })
      .state('admin.attendances.mark', {
        url: '/:assignmentId/mark',
        templateUrl: '/modules/attendances/client/views/mark-attendance.client.view.html',
        controller: 'MarkAttendanceController',
        controllerAs: 'vm',
        resolve: {
          assignmentResolve: getAssignment
        },
        data: {
          roles: ['professor', 'admin'],
          pageTitle: 'Mark Attendance'
        }
      });
  }

  getAssignment.$inject = ['$stateParams', 'AssignmentsService'];

  function getAssignment($stateParams, AssignmentsService) {
    return AssignmentsService.get({
      assignmentId: $stateParams.assignmentId
    }).$promise;
  }

  getCourse.$inject = ['$stateParams', 'CoursesService'];

  function getCourse($stateParams, CoursesService) {
    return CoursesService.get({
      courseId: $stateParams.courseId
    }).$promise;
  }

}());
