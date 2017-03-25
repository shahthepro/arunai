(function () {
  'use strict';

  angular
    .module('assesments')
    .controller('AssesmentsListController', AssesmentsListController);

  AssesmentsListController.$inject = ['AssesmentsService', 'Authentication', 'ProfessorsService'];

  function AssesmentsListController(AssesmentsService, Authentication, ProfessorsService) {
    var vm = this;
    vm.authentication = Authentication;

    vm.assignments = ProfessorsService.assignedCourses({
      userId: vm.authentication.user._id
    });

    vm.assesments = AssesmentsService.query();
  }
}());
