'use strict';

/**
 * Module dependencies
 */
var assesmentsPolicy = require('../policies/assesments.server.policy'),
  assesments = require('../controllers/assesments.server.controller'),
  courses = require('../../../courses/server/controllers/courses.server.controller');

module.exports = function(app) {
  // Assesments Routes
  app.route('/api/assesments')
    .get(assesments.list)
    .post(assesmentsPolicy.isAllowed, assesments.create);

  app.route('/api/assesments/:assesmentId')
    .get(assesments.read)
    .put(assesmentsPolicy.isAllowed, assesments.update)
    .delete(assesmentsPolicy.isAllowed, assesments.delete);

  app.route('/api/assesments/:courseId/:batch/:test')
    .get(assesments.getAssesments);

  app.route('/api/assesments/bystudent/:userId')
    .get(assesments.getByStudent);

  // Finish by binding the Assesment middleware
  app.param('assesmentId', assesments.assesmentByID);
  app.param('courseId', courses.courseByID);
};
