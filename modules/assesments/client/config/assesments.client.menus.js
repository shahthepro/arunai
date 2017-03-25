(function () {
  'use strict';

  angular
    .module('assesments')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('adminbar', {
      title: 'Assesments',
      state: 'admin.assesments',
      type: 'dropdown',
      roles: ['professor', 'hod', 'student'],
      position: 2
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('adminbar', 'admin.assesments', {
      title: 'Internal Assesments',
      state: 'admin.assesments.list',
      roles: ['professor', 'hod']
    });

    menuService.addSubMenuItem('adminbar', 'admin.assesments', {
      title: 'Internal Assesments',
      state: 'admin.assesments.view',
      roles: ['student'],
      position: 2
    });

  }
}());
