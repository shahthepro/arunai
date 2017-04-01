'use strict';

/**
 * Module dependencies
 */
var pagesPolicy = require('../policies/pages.server.policy'),
  pages = require('../controllers/pages.server.controller');

module.exports = function(app) {
  // Pages Routes
  app.route('/api/pages').all(pagesPolicy.isAllowed)
    .get(pages.list)
    .post(pages.create);

  app.route('/api/pages/onmenu').get(pages.pagesOnMenu);

  app.route('/api/pages/events')
    .get(pages.listEvents);

  app.route('/api/pages/:pageId').all(pagesPolicy.isAllowed)
    .get(pages.read)
    .put(pages.update)
    .delete(pages.delete);

  app.route('/api/pages/slugged/:slug')
    .get(pages.read);

  app.route('/api/pages/tagged/:tag')
    .get(pages.listByTag);


  // Finish by binding the Page middleware
  app.param('pageId', pages.pageByID);
  app.param('slug', pages.pageBySlug);
};
