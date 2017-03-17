(function () {
  'use strict';

  angular
    .module('courses')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('adminbar', {
      title: 'Courses',
      state: 'admin.courses',
      type: 'dropdown',
      roles: ['professor', 'hod'],
      position: 4
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('adminbar', 'admin.courses', {
      title: 'Add Courses',
      state: 'admin.courses.create',
      roles: ['professor', 'hod']
    });

    menuService.addSubMenuItem('adminbar', 'admin.courses', {
      title: 'List Courses',
      state: 'admin.courses.list',
      roles: ['professor', 'hod']
    });
  }
}());
