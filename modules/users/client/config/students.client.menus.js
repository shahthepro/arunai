(function () {
  'use strict';

  angular
    .module('users')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('adminbar', {
      title: 'Students',
      state: 'admin.students',
      type: 'dropdown',
      roles: ['professor', 'hod'],
      position: 6
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('adminbar', 'admin.students', {
      title: 'Add Student',
      state: 'admin.students.create',
      roles: ['professor', 'hod']
    });

    menuService.addSubMenuItem('adminbar', 'admin.students', {
      title: 'Import Students',
      state: 'admin.students.add',
      roles: ['professor', 'hod']
    });

    menuService.addSubMenuItem('adminbar', 'admin.students', {
      title: 'List Students',
      state: 'admin.students.list',
      roles: ['professor', 'hod']
    });
  }
}());
