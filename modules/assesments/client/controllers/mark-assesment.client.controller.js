(function () {
  'use strict';

  angular
    .module('assesments')
    .controller('MarkAssesmentController', MarkAssesmentController);

  MarkAssesmentController.$inject = ['AssesmentsService', 'ProfessorsService', 'StudentsService', 'Authentication', '$http', '$state', 'assignmentResolve', 'Notification'];

  function MarkAssesmentController(AssesmentsService, ProfessorsService, StudentsService, Authentication, $http, $state, assignment, Notification) {
    var vm = this;
    vm.authentication = Authentication;
    vm.professor = vm.authentication.user;
    vm.assignment = assignment;
    vm.course = vm.assignment.course;
    vm.assesmentTest = 'cia1';
    vm.assesments = [];
    vm.isLoading = false;

    /**
     * Fetch assesment records for the day
     */
    vm.fetchAssesments = function() {
      vm.assesments = [];
      vm.isLoading = true;

      var assesmentPromise = AssesmentsService.getAssesments({
        batch: vm.assignment.batch,
        courseId: vm.course._id,
        test: vm.assesmentTest
      }).$promise;
      var studentsPromise = StudentsService.filterStudents({
        departmentId: vm.course.department,
        batch: vm.assignment.batch,
        semester: vm.course.semester
      }).$promise;

      Promise.all([assesmentPromise, studentsPromise]).then(function(resps) {
        var assesments = resps[0];
        var students = resps[1];
        var ind;
        vm.assesments = assesments;

        for (ind = 0; ind < assesments.length; ind++) {
          AssesmentsService.get({
            assesmentId: assesments[ind]._id
          });
        }

        if (vm.assesments.length <= 0) {
          for (ind = 0; ind < students.length; ind++) {
            var newAssesment = new AssesmentsService();
            newAssesment.student = students[ind];
            newAssesment.course = vm.course;
            newAssesment.test = vm.assesmentTest;
            newAssesment.score = 0;
            vm.assesments.push(newAssesment);
          }
          Notification.info({ message: 'Assesment not yet marked for the test', delay: 3000 });
        }

        vm.isLoading = false;
      }).catch(function(reason) {
        vm.isLoading = false;
        Notification.error({ title: 'Something went wrong :(', message: reason, delay: 3000 });
      });

    };
    vm.fetchAssesments();

    /**
     * Save assesment records
     */
    vm.saveAssesment = function() {
      vm.isLoading = true;
      var assesmentPromises = [];
      vm.assesments.forEach(function(assesment) {
        if (assesment._id) {
          assesmentPromises.push(assesment.$update(successCallback, errorCallback).$promise);
        } else {
          assesmentPromises.push(assesment.$save(successCallback, errorCallback).$promise);
        }
      });

      Promise.all(assesmentPromises).then(function(resps) {
        Notification.success({ message: 'Internal Assesment records were saved!', delay: 3000 });
        vm.isLoading = false;
      }).catch(function(reason) {
        Notification.error({ message: 'Something went wrong :(', delay: 3000 });
        vm.isLoading = false;
      });

      function successCallback(res) {
      }

      function errorCallback(res) {
        // vm.error = res.data.message;
      }
    };
  }
}());
