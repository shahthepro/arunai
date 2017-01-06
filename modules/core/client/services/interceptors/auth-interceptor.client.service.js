(function () {
  'use strict';

  angular
    .module('core')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$q', '$injector', 'Authentication'];

  function authInterceptor($q, $injector, Authentication) {
    var service = {
      responseError: responseError
    };

    return service;

    function responseError(rejection) {
      if (!rejection.config.ignoreAuthModule) {
        var Notification = $injector.get('Notification');
        switch (rejection.status) {
          case 400:
            Notification.error({ message: rejection.data.message, title: 'Bad Request!', delay: 5000 });
            // TODO: $injector.get('$state').go('bad-request', { message: rejection.data.message });
            break;
          case 401:
            // Deauthenticate the global user
            Authentication.user = null;
            $injector.get('$state').transitionTo('authentication.signin');
            break;
          case 403:
            $injector.get('$state').transitionTo('forbidden');
            break;
          case 404:
            $injector.get('$state').go('not-found', { message: rejection.data.message });
            break;
          case -1:  // Handle error if no response from server(Network Lost or Server not responding)
            Notification.error({ message: 'No response received from server. Please try again later.', title: 'Error processing request!', delay: 5000 });
            break;
        }
      }
      // otherwise, default behaviour
      return $q.reject(rejection);
    }
  }
}());
