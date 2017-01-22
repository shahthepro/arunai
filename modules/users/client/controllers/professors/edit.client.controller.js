(function () {
  'use strict';

  angular
    .module('users')
    .controller('EditProfessorsController', EditProfessorsController);

  EditProfessorsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'userResolve', 'DepartmentsService'];

  function EditProfessorsController ($scope, $state, $window, Authentication, professor, DepartmentsService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.departments = DepartmentsService.query();
    vm.professor = professor;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.isHOD = false;

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
      if (vm.isHOD) {
        vm.professor.roles = ['hod'];
      }
      // console.log(vm.professor.department);
      // console.log(vm.authentication.user);
      // return;
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
