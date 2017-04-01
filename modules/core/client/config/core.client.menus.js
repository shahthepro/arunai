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
      title: 'Account',
      state: 'settings',
      type: 'dropdown',
      roles: ['user', 'student', 'professor', 'admin', 'hod']
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
  }
}());
