(function () {
  'use strict';

  // Sidebars controller
  angular
    .module('sidebars')
    .controller('SidebarsController', SidebarsController);

  SidebarsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'sidebarResolve'];

  function SidebarsController ($scope, $state, $window, Authentication, sidebar) {
    var vm = this;

    vm.authentication = Authentication;
    vm.sidebar = sidebar;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.addWidget = addWidget;
    vm.removeWidget = removeWidget;
    vm.tinymceOptions = {
      plugins: 'link image code',
      toolbar: 'undo redo | styleselect formatselect fontselect fontsizeselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist | image | outdent indent | code'
    };

    // Remove existing Sidebar
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.sidebar.$remove($state.go('admin.sidebars.list'));
      }
    }

    // Save Sidebar
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.sidebarForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.sidebar._id) {
        vm.sidebar.$update(successCallback, errorCallback);
      } else {
        vm.sidebar.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('admin.sidebars.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    // Add new widget
    function addWidget() {
      vm.sidebar.widgets = vm.sidebar.widgets || [];
      vm.sidebar.widgets.push({
        title: 'New Sidebar Widget',
        content: 'Widget content goes here...'
      });
    }

    // Remove widget
    function removeWidget(index) {
      vm.sidebar.widgets.splice(index, 1);
    }
  }
}());
