(function () {
  'use strict';

  angular
    .module('attendances')
    .controller('ViewAttendanceController', ViewAttendanceController);

  ViewAttendanceController.$inject = ['AttendancesService', 'Authentication'];

  function ViewAttendanceController(AttendancesService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.isLoading = true;
    vm.attendances = [];
    AttendancesService.getByStudent({
      studentId: vm.authentication.user._id
    }).$promise.then(function (attendances) {
      vm.attendances = groupByPresentStatus(attendances, function (item) {
        return item.course.code;
      });
      vm.isLoading = false;
    }).catch(function (reason) {
      Notification.error({ message: 'Something went wrong :(', delay: 3000 });
    });

    function groupByPresentStatus(array, f) {
      var groups = [];
      array.forEach(function (o) {
        var group = f(o);
        groups[group] = groups[group] || [];
        groups[group].name = group;
        groups[group].present = groups[group].present || 0;
        groups[group].absent = groups[group].absent || 0;
        if (o.status === true) {
          groups[group].present += 1;
        } else {
          groups[group].absent += 1;
        }
      });
      return Object.keys(groups).map(function (group) {
        return groups[group];
      });
    }
  }
}());
