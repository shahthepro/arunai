(function () {
  'use strict';

  angular
    .module('departments.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.departments', {
        abstract: true,
        url: '/departments',
        template: '<ui-view/>'
      })
      .state('admin.departments.list', {
        url: '',
        templateUrl: '/modules/departments/client/views/list-departments.client.view.html',
        controller: 'DepartmentsListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: 'Departments'
        }
      })
      .state('admin.departments.create', {
        url: '/create',
        templateUrl: '/modules/departments/client/views/form-department.client.view.html',
        controller: 'DepartmentsController',
        controllerAs: 'vm',
        resolve: {
          departmentResolve: newDepartment
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Add Department'
        }
      })
      .state('admin.departments.edit', {
        url: '/:departmentId/edit',
        templateUrl: '/modules/departments/client/views/form-department.client.view.html',
        controller: 'DepartmentsController',
        controllerAs: 'vm',
        resolve: {
          departmentResolve: getDepartment
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit Department {{ departmentResolve.name }}'
        }
      });
  }

  getDepartment.$inject = ['$stateParams', 'DepartmentsService'];

  function getDepartment($stateParams, DepartmentsService) {
    return DepartmentsService.get({
      departmentId: $stateParams.departmentId
    }).$promise;
  }

  newDepartment.$inject = ['DepartmentsService'];

  function newDepartment(DepartmentsService) {
    return new DepartmentsService();
  }
}());
