(function () {
  'use strict';

  angular
    .module('users.services')
    .factory('ProfessorsService', ProfessorsService);

  ProfessorsService.$inject = ['$resource'];

  function ProfessorsService($resource) {
    return $resource('/api/professors/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
