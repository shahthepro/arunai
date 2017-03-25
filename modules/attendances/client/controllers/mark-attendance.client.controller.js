(function () {
  'use strict';

  angular
    .module('attendances')
    .controller('MarkAttendanceController', MarkAttendanceController);

  MarkAttendanceController.$inject = ['AttendancesService', 'ProfessorsService', 'StudentsService', 'Authentication', '$http', '$state', 'assignmentResolve', 'Notification'];

  function MarkAttendanceController(AttendancesService, ProfessorsService, StudentsService, Authentication, $http, $state, assignment, Notification) {
    var vm = this;
    vm.authentication = Authentication;
    vm.professor = vm.authentication.user;
    vm.assignment = assignment;
    vm.course = vm.assignment.course;
    vm.date = new Date();
    vm.attendances = [];
    vm.isLoading = false;

    /**
     * Fetch attendance records for the day
     */
    vm.fetchAttendances = function() {
      vm.attendances = [];
      vm.isLoading = true;

      var attendancePromise = AttendancesService.getAttendances({
        batch: vm.assignment.batch,
        courseId: vm.course._id,
        date: Math.floor(vm.date.getTime() / 1000)
      }).$promise;
      var studentsPromise = StudentsService.filterStudents({
        departmentId: vm.course.department,
        batch: vm.assignment.batch,
        semester: vm.course.semester
      }).$promise;

      Promise.all([attendancePromise, studentsPromise]).then(function(resps) {
        var attendances = resps[0];
        var students = resps[1];
        var ind;
        vm.attendances = attendances;

        for (ind = 0; ind < attendances.length; ind++) {
          AttendancesService.get({
            attendanceId: attendances[ind]._id
          });
        }

        if (vm.attendances.length <= 0) {
          for (ind = 0; ind < students.length; ind++) {
            var newAttendance = new AttendancesService();
            newAttendance.student = students[ind];
            newAttendance.course = vm.course;
            newAttendance.date = vm.date;
            newAttendance.status = true;
            vm.attendances.push(newAttendance);
          }
          Notification.info({ message: 'Attendance not yet marked for the day', delay: 3000 });
        }

        vm.isLoading = false;
      }).catch(function(reason) {
        vm.isLoading = false;
        Notification.error({ title: 'Something went wrong :(', message: reason, delay: 3000 });
      });

    };
    vm.fetchAttendances();

    /**
     * Save attendance records
     */
    vm.saveAttendance = function() {
      vm.isLoading = true;
      var attendancePromises = [];
      vm.attendances.forEach(function(attendance) {
        if (attendance._id) {
          attendancePromises.push(attendance.$update(successCallback, errorCallback).$promise);
        } else {
          attendancePromises.push(attendance.$save(successCallback, errorCallback).$promise);
        }
      });

      Promise.all(attendancePromises).then(function(resps) {
        Notification.success({ message: 'Attendances records were saved!', delay: 3000 });
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
