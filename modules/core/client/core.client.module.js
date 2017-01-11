(function (app) {
  'use strict';

  app.registerModule('core', ['ui.toggle']);
  app.registerModule('core.routes', ['ui.router']);
  app.registerModule('core.admin', ['core', 'ui.toggle']);
  app.registerModule('core.admin.routes', ['ui.router']);
}(ApplicationConfiguration));
