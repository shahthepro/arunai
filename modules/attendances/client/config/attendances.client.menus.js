(function () {
  'use strict';

  angular
    .module('attendances')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Attendances',
      state: 'admin.attendances',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'admin.attendances', {
      title: 'List Articles',
      state: 'admin.attendances.list',
      roles: ['*']
    });
  }
}());
