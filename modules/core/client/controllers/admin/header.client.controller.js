(function () {
  'use strict';

  angular
    .module('core')
    .controller('AdminHeaderController', AdminHeaderController);

  AdminHeaderController.$inject = ['$scope', '$state', 'Authentication', 'menuService'];

  function AdminHeaderController($scope, $state, Authentication, menuService) {
    var vm = this;
    vm.authentication = Authentication;
  }
}());
