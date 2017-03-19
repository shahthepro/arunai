(function () {
  'use strict';

  angular
    .module('attendances')
    .controller('ReportAttendanceController', ReportAttendanceController);

  ReportAttendanceController.$inject = ['AttendancesService', 'ProfessorsService', 'StudentsService', 'Authentication', '$http', '$state', 'assignmentResolve', 'Notification'];

  function ReportAttendanceController(AttendancesService, ProfessorsService, StudentsService, Authentication, $http, $state, assignment, Notification) {
    var vm = this;
    vm.authentication = Authentication;
    vm.professor = vm.authentication.user;
    vm.assignment = assignment;
    vm.course = vm.assignment.course;
    vm.fromDate = new Date();
    vm.toDate = new Date();
    vm.attendances = {};
    vm.students = {};
    vm.isLoading = false;
    vm.datesBetween = [];
    vm.reportRecords = [];

    /**
     * Fetch attendance records for the day
     */
    vm.fetchAttendances = function() {
      vm.attendances = {};
      vm.datesBetween = [];
      vm.isLoading = true;


      var attendancePromise = AttendancesService.report({
        batch: vm.assignment.batch,
        courseId: vm.course._id,
        fromDate: Math.floor(vm.fromDate.getTime() / 1000),
        toDate: Math.floor(vm.toDate.getTime() / 1000)
      }).$promise;
      var studentsPromise = StudentsService.filterStudents({
        departmentId: vm.course.department,
        batch: vm.assignment.batch,
        semester: vm.course.semester
      }).$promise;

      Promise.all([attendancePromise, studentsPromise]).then(function(resps) {
        var attendances = resps[0];
        var students = resps[1];

        vm.students = students;

        var finalArray = {};

        for (var currentDate = vm.fromDate; currentDate <= vm.toDate; currentDate.setDate(currentDate.getDate() + 1)) {
          vm.datesBetween.push(new Date(currentDate));
        }

        attendances.forEach(function(item) {
          AttendancesService.get({
            attendanceId: item._id
          });
          var itemdate = ('' + item.date);
          // var odate = new Date([itemdate.slice(0, 4), itemdate.slice(4, 6), itemdate.slice(6, 8)].join('/'));
          if (finalArray['' + item.student._id] === undefined) {
            finalArray['' + item.student._id] = [];
          }
          if (finalArray['' + item.student._id]['' + itemdate] === undefined) {
            finalArray['' + item.student._id]['' + itemdate] = item.status;
          }
        });

        vm.attendances = attendances;
        vm.reportRecords = finalArray;

        vm.isLoading = false;
      }).catch(function(reason) {
        Notification.error({ title: 'Something went wrong :(', message: reason, delay: 3000 });
        vm.isLoading = false;
      });

    };

  }
}());
