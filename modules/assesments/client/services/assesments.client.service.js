// Assesments service used to communicate Assesments REST endpoints
(function () {
  'use strict';

  angular
    .module('assesments')
    .factory('AssesmentsService', AssesmentsService);

  AssesmentsService.$inject = ['$resource'];

  function AssesmentsService($resource) {
    return $resource('/api/assesments/:assesmentId', {
      assesmentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      getAssesments: {
        method: 'GET',
        url: '/api/assesments/:courseId/:batch/:test',
        isArray: true
      },
      getByStudent: {
        method: 'GET',
        url: '/api/assesments/bystudent/:studentId',
        isArray: true
      }
    });
  }
}());
