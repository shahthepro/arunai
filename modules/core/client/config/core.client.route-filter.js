(function () {
  'use strict';

  angular
    .module('core')
    .run(routeFilter);

  routeFilter.$inject = ['$rootScope', '$state', 'Authentication', '$window'];

  function routeFilter($rootScope, $state, Authentication, $window) {
    $rootScope.$on('$stateChangeStart', stateChangeStart);
    $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeStart(event, toState, toParams, fromState, fromParams) {
      // Reload layout if necessary
      // if (fromState.name !== '' && toState.name.startsWith('admin') !== fromState.name.startsWith('admin')) {
      //   event.preventDefault();
      //   $window.location.href = $state.href(toState.name, toParams, { absolute: true });
      // }

      // Check authentication before changing state
      if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
        var allowed = false;
        for (var i = 0, roles = toState.data.roles; i < roles.length; i++) {
          if ((roles[i] === 'guest') || (Authentication.user && Authentication.user.roles !== undefined && Authentication.user.roles.indexOf(roles[i]) !== -1)) {
            allowed = true;
            break;
          }
        }

        if (!allowed) {
          event.preventDefault();
          if (Authentication.user !== null && typeof Authentication.user === 'object') {
            $state.transitionTo('forbidden');
          } else {
            // $window.location.href = $state.href('authentication.signin', {}, { absolute: true });
            $state.go('authentication.signin').then(function () {
              // Record previous state
              storePreviousState(toState, toParams);
            });
          }
        }
      }
    }

    function stateChangeSuccess(event, toState, toParams, fromState, fromParams) {
      // Record previous state
      storePreviousState(fromState, fromParams);
    }

    // Store previous state
    function storePreviousState(state, params) {
      // only store this state if it shouldn't be ignored
      if (!state.data || !state.data.ignoreState) {
        $state.previous = {
          state: state,
          params: params,
          href: $state.href(state, params)
        };
      }
    }
  }
}());
