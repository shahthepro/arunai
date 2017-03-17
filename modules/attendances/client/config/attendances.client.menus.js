(function () {
  'use strict';

  angular
    .module('attendances')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('adminbar', {
      title: 'Assesments',
      state: 'admin.attendances',
      type: 'dropdown',
      roles: ['professor', 'hod'],
      position: 2
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('adminbar', 'admin.attendances', {
      title: 'Daily Attendance',
      state: 'admin.attendances.mark',
      roles: ['professor', 'hod']
    });

    menuService.addSubMenuItem('adminbar', 'admin.attendances', {
      title: 'Attendance Report',
      state: 'admin.attendances.report',
      roles: ['professor', 'hod']
    });

    menuService.addSubMenuItem('adminbar', 'admin.attendances', {
      title: 'Attendance',
      state: 'admin.attendances.view',
      roles: ['student'],
      position: 2
    });

  }
}());
