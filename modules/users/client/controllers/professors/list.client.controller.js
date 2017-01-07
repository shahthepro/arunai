(function () {
  'use strict';

  angular
    .module('users')
    .controller('ListProfessorsController', ListProfessorsController);

  ListProfessorsController.$inject = ['ProfessorsService'];

  function ListProfessorsController(ProfessorsService) {
    var vm = this;
    vm.professors = ProfessorsService.query();
  }
}());
