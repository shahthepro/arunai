(function () {
  'use strict';

  angular
    .module('assesments')
    .controller('ViewAssesmentController', ViewAssesmentController);

  ViewAssesmentController.$inject = ['AssesmentsService', 'Authentication'];

  function ViewAssesmentController(AssesmentsService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.isLoading = true;
    vm.assesments = [];
    AssesmentsService.getByStudent({
      studentId: vm.authentication.user._id
    }).$promise.then(function (assesments) {
      vm.assesments = groupByTest(assesments, function (item) {
        return item.course.code;
      });
      vm.isLoading = false;
    }).catch(function (reason) {
      Notification.error({ message: 'Something went wrong :(', delay: 3000 });
    });

    function groupByTest(array, f) {
      var groups = [];
      array.forEach(function (o) {
        var group = f(o);
        groups[group] = groups[group] || [];
        groups[group].name = group;
        groups[group][o.test] = o.score;
      });
      return Object.keys(groups).map(function (group) {
        return groups[group];
      });
    }
  }
}());
