(function() {
  'use strict';

  angular
    .module('users.services')
    .factory('UserMetaService', UserMetaService);

  UserMetaService.$inject = ['Authentication'];

  function UserMetaService(Authentication) {
    // TODO: getData and postData
    var auth = Authentication;

    function getData(metaKey, forUser = undefined, fallback = undefined) {
      var user = (forUser === undefined) ? auth.user : forUser;
      if (auth.user === undefined) {
        // User not logged in
        return undefined;
      }
      return undefined;
    }
  }

}());
