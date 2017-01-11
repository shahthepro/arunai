(function () {
  'use strict';

  angular
    .module('attendances')
    .controller('MarkAttendanceController', MarkAttendanceController);

  MarkAttendanceController.$inject = ['AttendancesService', 'ProfessorsService', 'StudentsService', 'AssignmentsService', 'Authentication', '$http', '$state', 'assignmentResolve'];

  function MarkAttendanceController(AttendancesService, ProfessorsService, StudentsService, AssignmentsService, Authentication, $http, $state, assignment) {
    var vm = this;
    vm.authentication = Authentication;
    vm.professor = vm.authentication.user;
    vm.assignment = assignment;
    vm.course = vm.assignment.course;
    vm.date = new Date();
    vm.attendances = AttendancesService.getAttendances({
      // departmentId: vm.course.department,
      batch: vm.assignment.batch,
      // semester: vm.course.semester,
      courseId: vm.course._id,
      date: Math.floor(vm.date.getTime() / 1000)
    });
    vm.students = StudentsService.filterStudents({
      departmentId: vm.course.department,
      batch: vm.assignment.batch,
      semester: vm.course.semester
    });
  }
}());
