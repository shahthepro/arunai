// Slides service used to communicate Slides REST endpoints
(function () {
  'use strict';

  angular
    .module('slides')
    .factory('SlidesService', SlidesService);

  SlidesService.$inject = ['$resource'];

  function SlidesService($resource) {
    return $resource('api/slides/:slideId', {
      slideId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
