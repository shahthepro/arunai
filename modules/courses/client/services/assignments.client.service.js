// assignments service used to communicate assignments REST endpoints
(function () {
  'use strict';

  angular
    .module('courses')
    .factory('AssignmentsService', AssignmentsService);

  AssignmentsService.$inject = ['$resource'];

  function AssignmentsService($resource) {
    return $resource('/api/assignments/:assignmentId', {
      assignmentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
