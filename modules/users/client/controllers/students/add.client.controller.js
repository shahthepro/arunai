(function () {
  'use strict';

  angular
    .module('users')
    .controller('AddStudentsController', AddStudentsController);

  AddStudentsController.$inject = ['$scope', '$http', 'Notification', 'PapaParse', 'DepartmentsService', 'StudentsService', 'Authentication'];


  function AddStudentsController($scope, $http, Notification, PapaParse, DepartmentsService, StudentsService, Authentication) {
    var vm = this;
    var linesParsed = 0;
    vm.authentication = Authentication;
    vm.department = undefined;
    vm.departments = DepartmentsService.query();
    vm.csvFiles = {};

    vm.parseAndImport = function() {
      if (vm.csvFiles && vm.department) {
        var config = {
          header: false,
          skipEmptyLines: true,
          step: parseSingleRecord,
          complete: fileParseComplete
        };

        PapaParse.parse(vm.csvFiles[0], config);
      } else if (vm.csvFiles) {
        Notification.error({ message: 'Select a department' });
      }
    };

    function fileParseComplete(results, file) {
      Notification.success({ message: (linesParsed - 1).toString() + ' records imported' });
      linesParsed = 0;
    }

    function parseSingleRecord(results, parser) {
      if (results.errors.length) {
        Notification.error({ message: 'Cannot save a data' });
        return;
      }
      linesParsed += 1;
      if (linesParsed === 1) {
        // Skip header
        return;
      }
      // var record = {
      //   firstName: results.data[0][0],
      //   lastName: results.data[0][1],
      //   department: vm.department,
      //   email: results.data[0][2],
      //   username: results.data[0][3]
      // };
      var student = new StudentsService();
      student.firstName = results.data[0][0];
      student.lastName = results.data[0][1];
      student.department = vm.department;
      student.email = results.data[0][2];
      student.username = results.data[0][3];
      student.metaData.regno = results.data[0][4];
      student.metaData.batch = results.data[0][5];
      student.metaData.semester = results.data[0][6];
      // $http.post('/api/students/add', record).then(function(response) {
      // },
      // function(response) {
      //   Notification.error('Cannot save the record ' + record.firstName);
      // });
      student.$save(function(res) {}, function() {
        Notification.error('Cannot save the record ' + student.metaData.regno);
      });
    }
  }
}());
