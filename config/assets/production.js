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
        'public/lib/angular-bootstrap-toggle/dist/angular-bootstrap-toggle.min.css',
        // endbower
      ],
      js: [
        // bower:js
        'public/lib/angular/angular.min.js',
        'public/lib/angular-animate/angular-animate.min.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'public/lib/angular-messages/angular-messages.min.js',
        'public/lib/angular-mocks/angular-mocks.js',
        'public/lib/angular-resource/angular-resource.min.js',
        'public/lib/angular-ui-notification/dist/angular-ui-notification.min.js',
        'public/lib/angular-ui-router/release/angular-ui-router.min.js',
        'public/lib/jquery/dist/jquery.min.js',
        'public/lib/bootstrap/dist/js/bootstrap.min.js',
        'public/lib/ng-file-upload/ng-file-upload.min.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        'public/lib/AdminLTE/dist/js/app.min.js',
        'public/lib/angular-file-upload/dist/angular-file-upload.min.js',
        'public/lib/Papa-Parse/papaparse.min.js',
        'public/lib/angular-bootstrap-toggle/dist/angular-bootstrap-toggle.min.js',
        'public/lib/tinymce/tinymce.min.js',
        'public/lib/angular-ui-tinymce/src/tinymce.js',
        'public/lib/slim-scroll/slimscroll.js',
        // endbower
      ]
    },
    css: 'public/dist/app*.min.css',
    js: 'public/dist/app*.min.js'
  }
};
