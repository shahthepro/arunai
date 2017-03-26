// Sidebars service used to communicate Sidebars REST endpoints
(function () {
  'use strict';

  angular
    .module('sidebars')
    .factory('SidebarsService', SidebarsService);

  SidebarsService.$inject = ['$resource'];

  function SidebarsService($resource) {
    return $resource('/api/sidebars/:sidebarId', {
      sidebarId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
