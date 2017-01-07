(function() {
  'use strict';

  angular
    .module('users.services')
    .factory('UserMetaService', UserMetaService);

  UserMetaService.$inject = ['Authentication', '$resource'];

  function UserMetaService(Authentication, $resource) {
    // TODO: getData and postData
    var auth = Authentication;
    return $resource('/api/users/:userId/meta/:metaKey', {
      userId: '@_id',
      metaKey: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }

}());
