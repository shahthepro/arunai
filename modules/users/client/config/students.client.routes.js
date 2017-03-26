(function () {
  'use strict';

  // Setting up route
  angular
    .module('users.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.students', {
        url: '/students',
        template: '<ui-view />',
        abstract: true
      })
      .state('admin.students.list', {
        url: '',
        templateUrl: '/modules/users/client/views/students/list.client.view.html',
        controller: 'ListStudentsController',
        controllerAs: 'vm',
        data: {
          roles: ['hod', 'admin'],
          pageTitle: 'Students'
        }
      })
      .state('admin.students.add', {
        url: '/add',
        templateUrl: '/modules/users/client/views/students/add.client.view.html',
        controller: 'AddStudentsController',
        controllerAs: 'vm',
        data: {
          roles: ['hod', 'admin'],
          pageTitle: 'Import Students'
        }
      })
      .state('admin.students.create', {
        url: '/create',
        templateUrl: '/modules/users/client/views/students/edit.client.view.html',
        controller: 'EditStudentsController',
        controllerAs: 'vm',
        resolve: {
          userResolve: newStudent
        },
        data: {
          roles: ['hod', 'admin'],
          pageTitle: 'New Student'
        }
      })
      .state('admin.students.edit', {
        url: '/:userId/edit',
        templateUrl: '/modules/users/client/views/students/edit.client.view.html',
        controller: 'EditStudentsController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getStudent
        },
        data: {
          roles: ['hod', 'admin'],
          pageTitle: 'Edit Student {{ userResolve.displayName }}'
        }
      });

    newStudent.$inject = ['$stateParams', 'StudentsService'];

    function newStudent($stateParams, StudentsService) {
      return new StudentsService();
    }

    getStudent.$inject = ['$stateParams', 'StudentsService'];

    function getStudent($stateParams, StudentsService) {
      return StudentsService.get({
        userId: $stateParams.userId
      }).$promise;
    }
  }
}());
