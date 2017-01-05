(function () {
  'use strict';

  // Setting up route
  angular
    .module('users.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.users', {
        url: '/users',
        templateUrl: '/modules/users/client/views/admin/list-users.client.view.html',
        controller: 'UserListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Users List'
        }
      })
      .state('admin.user-add', {
        url: '/users/new',
        templateUrl: '/modules/users/client/views/admin/add-user.client.view.html',
        controller: 'UserAddController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'New User'
        }
      })
      .state('admin.user', {
        url: '/users/:userId',
        templateUrl: '/modules/users/client/views/admin/view-user.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: 'Edit {{ userResolve.displayName }}'
        }
      })
      .state('admin.user-edit', {
        url: '/users/:userId/edit',
        templateUrl: '/modules/users/client/views/admin/edit-user.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: 'Edit User {{ userResolve.displayName }}'
        }
      })
      .state('admin.professors-add', {
        url: '/professors/add',
        templateUrl: '/modules/users/client/views/professors/add.client.view.html',
        controller: 'AddProfessorsController',
        controllerAs: 'vm',
        data: {
          roles: ['hod', 'admin'],
          pageTitle: 'Add Professors'
        }
      })
      .state('admin.students-add', {
        url: '/students/add',
        templateUrl: '/modules/users/client/views/students/add.client.view.html',
        controller: 'StudentController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Add Students'
        }
      });

    getUser.$inject = ['$stateParams', 'AdminService'];

    function getUser($stateParams, AdminService) {
      return AdminService.get({
        userId: $stateParams.userId
      }).$promise;
    }
  }
}());
