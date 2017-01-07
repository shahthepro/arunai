(function () {
  'use strict';

  angular
    .module('users')
    .controller('ListStudentsController', ListStudentsController);

  ListStudentsController.$inject = ['StudentsService'];

  function ListStudentsController(StudentsService) {
    var vm = this;
    vm.students = StudentsService.query();
  }
}());
