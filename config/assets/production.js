'use strict';

/* eslint comma-dangle:[0, "only-multiline"] */

module.exports = {
  client: {
    lib: {
      css: [
        // bower:css
        'public/lib/angular-ui-notification/dist/angular-ui-notification.min.css',
        'public/lib/bootstrap/dist/css/bootstrap.min.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
        'public/lib/AdminLTE/dist/css/AdminLTE.min.css',
        'public/lib/components-font-awesome/css/font-awesome.min.css',
        // endbower
      ],
      js: [
        // bower:js
        // 'public/lib/angular/angular.min.js',
        // 'public/lib/angular-animate/angular-animate.min.js',
        // 'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
        // 'public/lib/angular-messages/angular-messages.min.js',
        // 'public/lib/angular-mocks/angular-mocks.js',
        // 'public/lib/angular-route/angular-route.js',
        // 'public/lib/angular-resource/angular-resource.min.js',
        // 'public/lib/angular-ui-notification/dist/angular-ui-notification.min.js',
        // 'public/lib/angular-ui-router/release/angular-ui-router.min.js',
        // 'public/lib/ng-file-upload/ng-file-upload.min.js',
        // 'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        // 'public/lib/jquery/dist/jquery.js',
        // 'public/lib/AdminLTE/dist/js/app.min.js',
        // 'public/lib/angular-file-upload/dist/angular-file-upload.min.js',
        // 'public/lib/Papa-Parse/papaparse.min.js',
        'public/lib/angular/angular.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/ng-file-upload/ng-file-upload.js',
        'public/lib/angular-file-upload/dist/angular-file-upload.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-mocks/angular-mocks.js',
        'public/lib/angular-route/angular-route.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-ui-notification/dist/angular-ui-notification.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        'public/lib/jquery/dist/jquery.js',
        'public/lib/bootstrap/dist/js/bootstrap.js',
        'public/lib/Papa-Parse/papaparse.js',
        'public/lib/AdminLTE/plugins/slimScroll/jquery.slimscroll.js',
        // endbower
      ]
    },
    css: 'public/dist/app*.min.css',
    js: 'public/dist/app*.min.js'
  }
};
