(function () {
  'use strict';

  angular
    .module('pages')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('adminbar', {
      title: 'Pages',
      state: 'admin.pages',
      roles: ['admin'],
      type: 'dropdown',
      position: 1
    });

    menuService.addSubMenuItem('adminbar', 'admin.pages', {
      title: 'All Pages',
      state: 'admin.pages.list',
      roles: ['admin'],
      position: 1
    });

    menuService.addSubMenuItem('adminbar', 'admin.pages', {
      title: 'New Page',
      state: 'admin.pages.create',
      roles: ['admin'],
      position: 2
    });
  }
}());
