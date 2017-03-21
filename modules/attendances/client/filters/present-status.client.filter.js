(function () {
  'use strict';

  angular.module('attendances').filter('presentstatus', function () {
    return function (records, student, date) {
      if (records[student._id] === undefined) {
        return '-'; // Not Applicable
      }
      var textDate = date.getFullYear() + ('0' + date.getMonth()).slice(-2) + ('0' + date.getDate()).slice(-2);
      return (records[student._id]['' + textDate]) ? 'P' : 'A';
    };
  });

}());
