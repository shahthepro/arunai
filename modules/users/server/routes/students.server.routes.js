'use strict';

module.exports = function (app) {
  // User Routes
  var students = require('../controllers/students/students.server.controller');

  // Setting up the users profile api
  app.route('/api/students').get(students.list);
  app.route('/api/students/add').post(students.add);

};
