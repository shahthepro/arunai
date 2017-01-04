(function () {
  'use strict';

  angular
    .module('core')
    .controller('AdminSidebarController', AdminSidebarController);

  AdminSidebarController.$inject = ['$scope', '$state', 'Authentication', 'menuService'];

  function AdminSidebarController($scope, $state, Authentication, menuService) {
    var vm = this;
    vm.authentication = Authentication;
  }
}());
