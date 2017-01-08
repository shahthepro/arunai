(function () {
  'use strict';

  angular
    .module('attendances')
    .controller('MarkAttendanceController', MarkAttendanceController);

  MarkAttendanceController.$inject = ['AttendancesService', 'ProfessorsService', 'StudentsService', 'AssignmentsService', 'Authentication', '$http'];

  function MarkAttendanceController(AttendancesService, ProfessorsService, StudentsService, AssignmentsService, Authentication, $http) {
    var vm = this;
    vm.authentication = Authentication;
    vm.attendances = {}; // AttendancesService.query();
    vm.courses = {};
    vm.assignments = {};
    $http.get('/api/users/me').then(function(result) {
      vm.professor = result.data;
      $http.get('/api/professors/' + result.data.id + '/assigned').then(function(result) {
        vm.assignments = result.data;
      });
    });
    vm.fetchEnrolledStudents = function() {
      $http.get('/api/professors/' + result.data.id + '/assigned').then(function(result) {
        vm.assignments = result.data;
      });
    };
  }
}());
