(function () {
  'use strict';

  angular
    .module('assesments.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.assesments', {
        abstract: true,
        url: '/assesments',
        template: '<ui-view/>'
      })
      .state('admin.assesments.list', {
        url: '',
        templateUrl: '/modules/assesments/client/views/list-assesments.client.view.html',
        controller: 'AssesmentsListController',
        controllerAs: 'vm',
        data: {
          roles: ['professor', 'admin'],
          pageTitle: 'Internal Assesments'
        }
      })
      .state('admin.assesments.mark', {
        url: '/:assignmentId/mark',
        templateUrl: '/modules/assesments/client/views/mark-assesment.client.view.html',
        controller: 'MarkAssesmentController',
        controllerAs: 'vm',
        resolve: {
          assignmentResolve: getAssignment
        },
        data: {
          roles: ['professor', 'admin'],
          pageTitle: 'Update Internal Marks'
        }
      })
      .state('admin.assesments.report', {
        url: '/:assignmentId/report',
        templateUrl: '/modules/assesments/client/views/report-assesment.client.view.html',
        controller: 'ReportAssesmentController',
        controllerAs: 'vm',
        resolve: {
          assignmentResolve: getAssignment
        },
        data: {
          roles: ['professor', 'admin'],
          pageTitle: 'Assesment Report'
        }
      })
      .state('admin.assesments.view', {
        url: '/view',
        templateUrl: '/modules/assesments/client/views/view-assesment.client.view.html',
        controller: 'ViewAssesmentController',
        controllerAs: 'vm',
        data: {
          roles: ['student'],
          pageTitle: 'Assesment Report'
        }
      });
  }

  getAssignment.$inject = ['$stateParams', 'AssignmentsService'];

  function getAssignment($stateParams, AssignmentsService) {
    return AssignmentsService.get({
      assignmentId: $stateParams.assignmentId
    }).$promise;
  }

  getCourse.$inject = ['$stateParams', 'CoursesService'];

  function getCourse($stateParams, CoursesService) {
    return CoursesService.get({
      courseId: $stateParams.courseId
    }).$promise;
  }

}());
