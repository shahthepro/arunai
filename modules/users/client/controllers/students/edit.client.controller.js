(function () {
  'use strict';

  angular
    .module('users')
    .controller('EditStudentsController', EditStudentsController);

  EditStudentsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'userResolve', 'DepartmentsService'];

  function EditStudentsController ($scope, $state, $window, Authentication, student, DepartmentsService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.departments = DepartmentsService.query();
    vm.student = student;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.student.$remove($state.go('admin.students.list'));
      }
    }

    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.studentForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.student._id) {
        vm.student.$update(successCallback, errorCallback);
      } else {
        vm.student.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('admin.students.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
