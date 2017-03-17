(function () {
  'use strict';

  angular
    .module('pages')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('adminbar', {
      title: 'Pages',
      state: 'admin.pages.list',
      roles: ['admin'],
      position: 1
    });
  }
}());
