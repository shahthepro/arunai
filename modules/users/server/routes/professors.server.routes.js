'use strict';

module.exports = function (app) {
  // User Routes
  var professorsPolicy = require('../policies/professors.server.policy'),
    professors = require('../controllers/professors.server.controller');

  // Setting up the users profile api
  // app.route('/api/professors').get(professors.list);
  app.route('/api/professors').get(professors.list).post(professorsPolicy.isAllowed, professors.add);

};
