'use strict';

/**
 * Module dependencies
 */
var techFeeds = require('../controllers/techfeeds.server.controller');

module.exports = function(app) {
  // TechFeeds Routes
  app.route('/api/techfeeds')
    .get(techFeeds.list)
    .post(techFeeds.create);

  app.route('/api/techfeeds/status/:approvalStatus')
    .get(techFeeds.listByStatus);

  app.route('/api/techfeeds/category/:category')
    .get(techFeeds.listByCategory);

  app.route('/api/techfeeds/:techFeedId')
    .get(techFeeds.read)
    .put(techFeeds.update)
    .delete(techFeeds.delete);

  app.route('/api/techfeeds/:techFeedId/approve')
    .get(techFeeds.approveFeed);

  app.route('/api/techfeeds/:techFeedId/disapprove')
    .get(techFeeds.disapproveFeed);

  // Finish by binding the TechFeed middleware
  app.param('techFeedId', techFeeds.techFeedByID);
};
