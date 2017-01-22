(function () {
  'use strict';

  angular
    .module('attendances')
    .controller('MarkAttendanceController', MarkAttendanceController);

  MarkAttendanceController.$inject = ['AttendancesService', 'ProfessorsService', 'StudentsService', 'AssignmentsService', 'Authentication', '$http', '$state', 'assignmentResolve', 'Notification'];

  function MarkAttendanceController(AttendancesService, ProfessorsService, StudentsService, AssignmentsService, Authentication, $http, $state, assignment, Notification) {
    var vm = this;
    vm.authentication = Authentication;
    vm.professor = vm.authentication.user;
    vm.assignment = assignment;
    vm.course = vm.assignment.course;
    vm.date = new Date();
    vm.attendances = [];

    /**
     * Fetch attendance records for the day
     */
    vm.fetchAttendances = function() {
      vm.attendances = [];
      AttendancesService.getAttendances({
        batch: vm.assignment.batch,
        courseId: vm.course._id,
        date: Math.floor(vm.date.getTime() / 1000)
      }).$promise.then(function(attendances) {
        if (attendances.length > 0) {
          // If records exist
          vm.attendances = attendances;
        } else {
          // Otherwise, find all students and create records
          StudentsService.filterStudents({
            departmentId: vm.course.department,
            batch: vm.assignment.batch,
            semester: vm.course.semester
          }).$promise.then(function(students) {
            // Create and populate records
            students.forEach(function(student) {
              var newAttendance = new AttendancesService();
              newAttendance.student = student;
              newAttendance.course = vm.course;
              newAttendance.date = vm.date;
              newAttendance.status = true;
              // var newAttendance = {
              //   student: student,
              //   course: vm.course,
              //   date: vm.date,
              //   status: true
              // };
              vm.attendances.push(newAttendance);
            });
            Notification.info({ message: 'Attendance not yet marked for the day', delay: 3000 });
          }, function(error) {
            Notification.error({ title: 'Something went wrong', message: 'Failed to fetch records', delay: 3000 });
          });
        }
      }, function(error) {
        Notification.error({ title: 'Something went wrong', message: 'Failed to fetch records', delay: 3000 });
      });
    };

    vm.fetchAttendances();

    /**
     * Save attendance records
     */
    vm.saveAttendance = function() {
      vm.attendances.forEach(function(attendance) {
        if (attendance._id) {
          attendance.$update(successCallback, errorCallback);
        } else {
          attendance.$save(successCallback, errorCallback);
        }
      });

      function successCallback(res) {
        console.log(vm.attendances);
      }

      function errorCallback(res) {
        vm.error = res.data.message;
        console.log(res);
      }
    };
  }
}());
