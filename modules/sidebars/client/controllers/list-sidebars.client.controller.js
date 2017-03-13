(function () {
  'use strict';

  angular
    .module('sidebars')
    .controller('SidebarsListController', SidebarsListController);

  SidebarsListController.$inject = ['SidebarsService'];

  function SidebarsListController(SidebarsService) {
    var vm = this;

    vm.sidebars = SidebarsService.query();
  }
}());
