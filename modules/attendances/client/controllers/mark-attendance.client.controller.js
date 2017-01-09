(function () {
  'use strict';

  angular
    .module('attendances')
    .controller('MarkAttendanceController', MarkAttendanceController);

  MarkAttendanceController.$inject = ['AttendancesService', 'ProfessorsService', 'StudentsService', 'AssignmentsService', 'Authentication', '$http', '$state'];

  function MarkAttendanceController(AttendancesService, ProfessorsService, StudentsService, AssignmentsService, Authentication, $http, $state) {
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
    vm.fetchRecords = function() {
      // var dated = (Date.parse(vm.date)/1000);
      // $http.get('/api/attendances/' + dated + '/' + vm.course).then(function(result) {
      //   vm.assignments = result.data;
      // });
      console.log(vm.date, vm.course, vm.professor);
      // $http.get('/api/attendances/' + vm.course + '/students').then(function(result) {
      //   vm.assignments = result.data;
      // });
    };
  }
}());
