(function () {
  'use strict';

  // Setting up route
  angular
    .module('users.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.professors', {
        url: '/professors',
        template: '<ui-view />',
        abstract: true
      })
      .state('admin.professors.list', {
        url: '',
        templateUrl: '/modules/users/client/views/professors/list.client.view.html',
        controller: 'ListProfessorsController',
        controllerAs: 'vm',
        data: {
          roles: ['hod', 'admin'],
          pageTitle: 'List Professors'
        }
      })
      .state('admin.professors.add', {
        url: '/add',
        templateUrl: '/modules/users/client/views/professors/add.client.view.html',
        controller: 'AddProfessorsController',
        controllerAs: 'vm',
        data: {
          roles: ['hod', 'admin'],
          pageTitle: 'Add Professors'
        }
      })
      .state('admin.professors.create', {
        url: '/create',
        templateUrl: '/modules/users/client/views/professors/edit.client.view.html',
        controller: 'EditProfessorsController',
        controllerAs: 'vm',
        resolve: {
          userResolve: newProfessor
        },
        data: {
          roles: ['hod', 'admin'],
          pageTitle: 'New Professor'
        }
      })
      .state('admin.professors.edit', {
        url: '/:userId/edit',
        templateUrl: '/modules/users/client/views/professors/edit.client.view.html',
        controller: 'EditProfessorsController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getProfessor
        },
        data: {
          roles: ['hod', 'admin'],
          pageTitle: 'Edit Professor {{ userResolve.displayName }}'
        }
      });

    newProfessor.$inject = ['$stateParams', 'ProfessorsService'];

    function newProfessor($stateParams, ProfessorsService) {
      return new ProfessorsService();
    }

    getProfessor.$inject = ['$stateParams', 'ProfessorsService'];

    function getProfessor($stateParams, ProfessorsService) {
      return ProfessorsService.get({
        userId: $stateParams.userId
      }).$promise;
    }
  }
}());
