(function () {
  'use strict';

  angular
    .module('assesments')
    .controller('ReportAssesmentController', ReportAssesmentController);

  ReportAssesmentController.$inject = ['AssesmentsService', 'ProfessorsService', 'StudentsService', 'Authentication', '$http', '$state', 'assignmentResolve', 'Notification'];

  function ReportAssesmentController(AssesmentsService, ProfessorsService, StudentsService, Authentication, $http, $state, assignment, Notification) {
    var vm = this;
    vm.authentication = Authentication;
    vm.professor = vm.authentication.user;
    vm.assignment = assignment;
    vm.course = vm.assignment.course;
    vm.assesmentTest = 'cia1';
    vm.assesments = {};
    vm.isLoading = false;

    /**
     * Fetch assesment records for the test
     */
    vm.fetchAssesments = function() {
      vm.assesments = {};
      vm.isLoading = true;


      var assesmentPromise = AssesmentsService.getAssesments({
        batch: vm.assignment.batch,
        courseId: vm.course._id,
        test: vm.assesmentTest
      }).$promise;

      Promise.all([assesmentPromise]).then(function(resps) {
        var assesments = resps[0];

        assesments.forEach(function (item) {
          AssesmentsService.get({
            assesmentId: item._id
          });
        });

        vm.assesments = assesments;

        vm.isLoading = false;
      }).catch(function(reason) {
        Notification.error({ title: 'Something went wrong :(', message: reason, delay: 3000 });
        vm.isLoading = false;
      });

    };

  }
}());
