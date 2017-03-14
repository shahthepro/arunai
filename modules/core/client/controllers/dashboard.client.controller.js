(function () {
  'use strict';

  angular
    .module('core')
    .controller('AdminDashboardController', AdminDashboardController);

  AdminDashboardController.$inject = ['$scope', '$state', 'Authentication', 'menuService'];

  function AdminDashboardController($scope, $state, Authentication, menuService) {
    var vm = this;
    vm.authentication = Authentication;
  }
}());
