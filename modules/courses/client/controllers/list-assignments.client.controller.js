(function () {
  'use strict';

  angular
    .module('courses')
    .controller('AssignmentsListController', AssignmentsListController);

  AssignmentsListController.$inject = ['AssignmentsService'];

  function AssignmentsListController(AssignmentsService) {
    var vm = this;
    vm.assignments = AssignmentsService.query();
  }
}());
