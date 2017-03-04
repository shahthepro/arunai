(function () {
  'use strict';

  angular.module('pages').filter('unsafe', function ($sce) {
    return function (val) {
      return $sce.trustAsHtml(unescape(val));
    };
  });
  // angular.module('pages').directive('bindHtmlUnsafe', function($compile) {
  //   return function($scope, $element, $attrs) {

  //     var compile = function(newHTML) { // Create re-useable compile function
  //       newHTML = $compile(newHTML)($scope); // Compile html
  //       $element.html('').append(newHTML); // Clear and append it
  //     };

  //     var htmlName = $attrs.bindHtmlUnsafe; // Get the name of the variable

  //     $scope.$watch(htmlName, function(newHTML) { // Watch for changes to
  //       if (!newHTML) {
  //         return;
  //       }
  //       compile(newHTML);   // Compile it
  //     });
  //   };
  // });

}());
