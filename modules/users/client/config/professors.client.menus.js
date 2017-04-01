(function () {
  'use strict';

  angular
    .module('users')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('adminbar', {
      title: 'Professors',
      state: 'admin.professors',
      type: 'dropdown',
      roles: ['professor', 'hod', 'admin'],
      position: 5
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('adminbar', 'admin.professors', {
      title: 'Add Professor',
      state: 'admin.professors.create',
      roles: ['professor', 'hod', 'admin']
    });

    menuService.addSubMenuItem('adminbar', 'admin.professors', {
      title: 'Import Professors',
      state: 'admin.professors.add',
      roles: ['professor', 'hod', 'admin']
    });

    menuService.addSubMenuItem('adminbar', 'admin.professors', {
      title: 'List Professors',
      state: 'admin.professors.list',
      roles: ['professor', 'hod', 'admin']
    });

    menuService.addSubMenuItem('adminbar', 'admin.professors', {
      title: 'Assign Courses',
      state: 'admin.assignments.create',
      roles: ['hod']
    });

    menuService.addSubMenuItem('adminbar', 'admin.professors', {
      title: 'View Course Assignments',
      state: 'admin.assignments.list',
      roles: ['professor', 'hod']
    });
  }
}());
