(function () {
  'use strict';

  angular
    .module('users')
    .controller('AddProfessorsController', AddProfessorsController);

  AddProfessorsController.$inject = ['$scope', '$http', 'Notification', 'PapaParse'];


  function AddProfessorsController($scope, $http, Notification, PapaParse) {
    var vm = this;
    var linesParsed = 0;
    vm.department = undefined;
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
      var record = {
        firstName: results.data[0][0],
        lastName: results.data[0][1],
        department: vm.department,
        email: results.data[0][2],
        username: results.data[0][3]
      };
      $http.post('/api/professors/add', record).then(function(response) {
        // success
        console.log(response);
      },
      function(response) {
        console.log(response);
        Notification.error('Cannot save the record ' + record.firstName);
      });
    }
  }
}());
