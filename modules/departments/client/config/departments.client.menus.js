(function () {
  'use strict';

  angular
    .module('departments')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('adminbar', {
      title: 'Departments',
      state: 'admin.departments',
      type: 'dropdown',
      roles: ['professor', 'hod'],
      position: 3
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('adminbar', 'admin.departments', {
      title: 'Add Departments',
      state: 'admin.departments.create',
      roles: ['admin']
    });

    menuService.addSubMenuItem('adminbar', 'admin.departments', {
      title: 'List Departments',
      state: 'admin.departments.list',
      roles: ['admin']
    });
  }
}());
