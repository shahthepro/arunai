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
      .state('admin.attendances.mark', {
        url: '',
        templateUrl: '/modules/attendances/client/views/mark-attendance.client.view.html',
        controller: 'MarkAttendanceController',
        controllerAs: 'vm',
        data: {
          roles: ['professor', 'admin'],
          pageTitle: 'Mark Attendance'
        }
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
      .state('admin.attendances.create', {
        url: '/create',
        templateUrl: '/modules/attendances/client/views/form-attendance.client.view.html',
        controller: 'AttendancesController',
        controllerAs: 'vm',
        resolve: {
          attendanceResolve: newAttendance
        },
        data: {
          roles: ['professor', 'admin'],
          pageTitle: 'Attendances Create'
        }
      })
      .state('admin.attendances.edit', {
        url: '/:attendanceId/edit',
        templateUrl: '/modules/attendances/client/views/form-attendance.client.view.html',
        controller: 'AttendancesController',
        controllerAs: 'vm',
        resolve: {
          attendanceResolve: getAttendance
        },
        data: {
          roles: ['professor', 'admin'],
          pageTitle: 'Edit Attendance {{ attendanceResolve.name }}'
        }
      });
  }

  getAttendance.$inject = ['$stateParams', 'AttendancesService'];

  function getAttendance($stateParams, AttendancesService) {
    return AttendancesService.get({
      attendanceId: $stateParams.attendanceId
    }).$promise;
  }

  newAttendance.$inject = ['AttendancesService'];

  function newAttendance(AttendancesService) {
    return new AttendancesService();
  }
}());
