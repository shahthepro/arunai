(function () {
  'use strict';

  angular
    .module('core')
    .directive('fileListBind', fileListBind);

  function fileListBind() {
    return {
      scope: {
        fileListBind: '=',
        onChangeCallback: '&'
      },
      link: function(scope, element, attributes) {
        element.bind('change', function(event) {
          scope.$apply(function() {
            scope.fileListBind = event.target.files;
            scope.onChangeCallback({ files: event.target.files });
          });
        });
      }
    };
  }
}());
