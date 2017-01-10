(function () {
  'use strict';

  angular
    .module('attendances')
    .controller('MarkAttendanceController', MarkAttendanceController);

  MarkAttendanceController.$inject = ['AttendancesService', 'ProfessorsService', 'StudentsService', 'AssignmentsService', 'Authentication', '$http', '$state'];

  function MarkAttendanceController(AttendancesService, ProfessorsService, StudentsService, AssignmentsService, Authentication, $http, $state) {
    var vm = this;
    vm.authentication = Authentication;
    vm.attendances = {};
    vm.professor = vm.authentication.user;
  }
}());
