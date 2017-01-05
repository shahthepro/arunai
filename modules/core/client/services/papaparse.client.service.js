(function() {
  'use strict';

  angular
    .module('core')
    .factory('PapaParse', PapaParseService);

  PapaParseService.$inject = ['$window'];

  function PapaParseService($window) {
    if (typeof $window.Papa === 'undefined') {
      throw new Error('PapaParse files are not included');
    }
    return $window.Papa;
  }

}());
