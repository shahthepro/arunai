(function () {
  'use strict';

  angular
    .module('core')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', 'PagesService'];

  function menuConfig(menuService, PagesService) {

    menuService.addMenu('account', {
      roles: ['user']
    });

    menuService.addMenuItem('account', {
      title: '',
      state: 'settings',
      type: 'dropdown',
      roles: ['user']
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'My Dashboard',
      state: 'admin.dashboard'
    });

    PagesService.getForMenu().$promise.then(function(pages) {
      pages.forEach(function(page) {
        menuService.addMenuItem('topbar', {
          title: page.title,
          state: 'pages.view({ slug: "' + page.slug + '" })',
          position: page.menuOrder
        });
      });
    });

    // menuService.addSubMenuItem('account', 'settings', {
    //   title: 'Edit Profile',
    //   state: 'settings.profile'
    // });

    // menuService.addSubMenuItem('account', 'settings', {
    //   title: 'Edit Profile Picture',
    //   state: 'settings.picture'
    // });

    // menuService.addSubMenuItem('account', 'settings', {
    //   title: 'Change Password',
    //   state: 'settings.password'
    // });

    // menuService.addSubMenuItem('account', 'settings', {
    //   title: 'Manage Social Accounts',
    //   state: 'settings.accounts'
    // });
  }
}());
