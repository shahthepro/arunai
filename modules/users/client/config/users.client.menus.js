(function () {
  'use strict';

  angular
    .module('users')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('adminbar', {
      title: 'Settings',
      state: 'settings',
      type: 'dropdown',
      position: 9
    });

    menuService.addSubMenuItem('adminbar', 'settings', {
      title: 'Edit Profile',
      state: 'settings.profile',
      position: 1
    });

    menuService.addSubMenuItem('adminbar', 'settings', {
      title: 'Change Password',
      state: 'settings.password',
      position: 2
    });
  }
}());
