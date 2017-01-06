(function () {
  'use strict';

  angular
    .module('users.services')
    .factory('ProfessorsService', ProfessorsService);

  ProfessorsService.$inject = ['$resource'];

  function ProfessorsService($resource) {
    return $resource('/api/professors/', {}, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
