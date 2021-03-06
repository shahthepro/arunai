(function () {
  'use strict';

  angular
    .module('attendances')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // menuService.addMenuItem('adminbar', {
    //   title: 'Assesments',
    //   state: 'admin.attendances',
    //   type: 'dropdown',
    //   roles: ['professor', 'hod', 'student'],
    //   position: 2
    // });

    // Add the dropdown list item
    menuService.addSubMenuItem('adminbar', 'admin.assesments', {
      title: 'Daily Attendance',
      state: 'admin.attendances.list',
      roles: ['professor', 'hod']
    });

    menuService.addSubMenuItem('adminbar', 'admin.assesments', {
      title: 'Attendance',
      state: 'admin.attendances.view',
      roles: ['student'],
      position: 2
    });

  }
}());
