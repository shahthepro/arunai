'use strict';

/**
 * Module dependencies
 */
var sidebarsPolicy = require('../policies/sidebars.server.policy'),
  sidebars = require('../controllers/sidebars.server.controller');

module.exports = function(app) {
  // Sidebars Routes
  app.route('/api/sidebars')
    .get(sidebars.list)
    .post(sidebars.create);

  app.route('/api/sidebars/:sidebarId')
    .get(sidebars.read)
    .put(sidebars.update)
    .delete(sidebars.delete);

  // Finish by binding the Sidebar middleware
  app.param('sidebarId', sidebars.sidebarByID);
};
