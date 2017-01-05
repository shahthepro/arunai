(function () {
  'use strict';

  angular
    .module('users')
    .controller('StudentController', StudentController);

  StudentController.$inject = ['$scope', '$http', 'FileUploader'];

  function StudentController($scope, $http, FileUploader) {
    var vm = this;

    vm.uploader = new FileUploader({
      url: '/api/students/add',
      alias: 'csvFile',
      // onAfterAddingFile: onAfterAddingFile,
      onSuccessItem: onSuccessItem,
      onErrorItem: onErrorItem,
      // onBeforeUploadItem: onBeforeUploadItem,
      queueLimit: 1
    });

    vm.uploadStudentsData = function() {
      // test
      console.log('okay');
      vm.uploader.formData = { csvFile: vm.csvFile };
      vm.uploader.uploadAll();
      console.log('okay');
      // $http({
      //   method: 'POST',
      //   url: '/api/students/add'
      // }).then(function successCallback(response) {
      //   // this callback will be called asynchronously
      //   // when the response is available
      // }, function errorCallback(response) {
      //   // called asynchronously if an error occurs
      //   // or server returns response with an error status.
      // });
    };

    function onSuccessItem(fileItem, response, status, headers) {
      // Show success message
      console.log('success');
    }

    function onErrorItem(fileItem, response, status, headers) {
      // vm.error = response.message;
      console.log(response.message);
    }
  }
}());
