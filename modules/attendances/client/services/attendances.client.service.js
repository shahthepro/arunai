// Attendances service used to communicate Attendances REST endpoints
(function () {
  'use strict';

  angular
    .module('attendances')
    .factory('AttendancesService', AttendancesService);

  AttendancesService.$inject = ['$resource'];

  function AttendancesService($resource) {
    return $resource('/api/attendances/:attendanceId', {
      attendanceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      getAttendances: {
        method: 'GET',
        url: '/api/attendances/:courseId/:batch/:date',
        isArray: true
      },
      report: {
        method: 'GET',
        url: '/api/attendances/:courseId/:batch/:fromDate/:toDate',
        isArray: true
      },
      getByStudent: {
        method: 'GET',
        url: '/api/attendances/bystudent/:studentId',
        isArray: true
      }
    });
  }
}());
