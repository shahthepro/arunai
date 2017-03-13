(function () {
  'use strict';

  angular
    .module('slides')
    .controller('SlidesListController', SlidesListController);

  SlidesListController.$inject = ['SlidesService'];

  function SlidesListController(SlidesService) {
    var vm = this;

    vm.slides = SlidesService.query();
  }
}());
