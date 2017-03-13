(function () {
  'use strict';

  // Slides controller
  angular
    .module('slides')
    .controller('SlidesController', SlidesController);

  SlidesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'slideResolve'];

  function SlidesController ($scope, $state, $window, Authentication, slide) {
    var vm = this;

    vm.authentication = Authentication;
    vm.slide = slide;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Slide
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.slide.$remove($state.go('slides.list'));
      }
    }

    // Save Slide
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.slideForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.slide._id) {
        vm.slide.$update(successCallback, errorCallback);
      } else {
        vm.slide.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('slides.view', {
          slideId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
