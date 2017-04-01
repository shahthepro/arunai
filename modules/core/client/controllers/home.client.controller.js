(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['PagesService'];

  function HomeController(PagesService) {
    var vm = this;
    vm.events = PagesService.getEvents();
  }
}());
