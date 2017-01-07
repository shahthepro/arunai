(function () {
  'use strict';

  // Courses controller
  angular
    .module('courses')
    .controller('CoursesController', CoursesController);

  CoursesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'courseResolve', 'DepartmentsService'];

  function CoursesController ($scope, $state, $window, Authentication, course, DepartmentsService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.departments = DepartmentsService.query();
    vm.course = course;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Course
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.course.$remove($state.go('admin.courses.list'));
      }
    }

    // Save Course
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.courseForm');
        return false;
      }
      // TODO: move create/update logic to service
      if (vm.course._id) {
        vm.course.$update(successCallback, errorCallback);
      } else {
        vm.course.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('admin.courses.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
