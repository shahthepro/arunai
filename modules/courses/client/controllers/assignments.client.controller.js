(function () {
  'use strict';

  // Courses controller
  angular
    .module('courses')
    .controller('AssignmentsController', AssignmentsController);

  AssignmentsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'ProfessorsService', 'CoursesService', 'AssignmentsService', 'assignmentResolve'];

  function AssignmentsController ($scope, $state, $window, Authentication, ProfessorsService, CoursesService, AssignmentsService, assignment) {
    var vm = this;

    vm.authentication = Authentication;
    vm.courses = CoursesService.query();
    vm.professors = ProfessorsService.query();
    vm.assignment = assignment;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Course
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.assignment.$remove($state.go('admin.assignments.list'));
      }
    }

    // Save Course
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.assignmentForm');
        return false;
      }
      // TODO: move create/update logic to service
      if (vm.assignment._id) {
        vm.assignment.$update(successCallback, errorCallback);
      } else {
        vm.assignment.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('admin.assignments.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
