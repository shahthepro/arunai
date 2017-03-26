(function () {
  'use strict';

  angular
    .module('pages')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addSubMenuItem('adminbar', 'admin.pages', {
      title: 'All Sidebars',
      state: 'admin.sidebars.list',
      roles: ['admin'],
      position: 3
    });
    menuService.addSubMenuItem('adminbar', 'admin.pages', {
      title: 'New Sidebar',
      state: 'admin.sidebars.create',
      roles: ['admin'],
      position: 4
    });
  }
}());
