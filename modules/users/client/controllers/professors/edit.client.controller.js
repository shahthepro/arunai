(function () {
  'use strict';

  angular
    .module('users')
    .controller('EditProfessorsController', EditProfessorsController);

  EditProfessorsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'userResolve'];

  function EditProfessorsController ($scope, $state, $window, Authentication, professor) {
    var vm = this;

    vm.authentication = Authentication;
    vm.professor = professor;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.professor.$remove($state.go('admin.professors.list'));
      }
    }

    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.professorForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.professor._id) {
        vm.professor.$update(successCallback, errorCallback);
      } else {
        vm.professor.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('admin.professors.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
