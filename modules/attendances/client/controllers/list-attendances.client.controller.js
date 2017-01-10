(function () {
  'use strict';

  angular
    .module('attendances')
    .controller('AttendancesListController', AttendancesListController);

  AttendancesListController.$inject = ['AttendancesService', 'Authentication', 'ProfessorsService'];

  function AttendancesListController(AttendancesService, Authentication, ProfessorsService) {
    var vm = this;
    vm.authentication = Authentication;

    vm.assignments = ProfessorsService.assignedCourses({
      userId: vm.authentication.user._id
    });

    vm.attendances = AttendancesService.query();
  }
}());
