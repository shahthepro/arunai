(function () {
  'use strict';

  angular
    .module('users.services')
    .factory('StudentsService', StudentsService);

  StudentsService.$inject = ['$resource'];

  function StudentsService($resource) {
    return $resource('/api/students/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
