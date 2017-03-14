(function () {
  'use strict';

  angular
    .module('courses')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Courses',
      state: 'admin.courses',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'admin.courses', {
      title: 'List Articles',
      state: 'admin.courses',
      roles: ['*']
    });
  }
}());
