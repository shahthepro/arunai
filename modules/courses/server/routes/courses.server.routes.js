'use strict';

/**
 * Module dependencies
 */
var coursesPolicy = require('../policies/courses.server.policy'),
  courses = require('../controllers/courses.server.controller'),
  courseAssignments = require('../controllers/course-assignments.server.controller');

module.exports = function(app) {
  // Courses Routes
  app.route('/api/courses')
    .get(courses.list)
    .post(coursesPolicy.isAllowed, courses.create);

  app.route('/api/courses/:courseId')
    .get(courses.read)
    .put(coursesPolicy.isAllowed, courses.update)
    .delete(coursesPolicy.isAllowed, courses.delete);

  app.route('/api/assignments')
    .get(courseAssignments.list)
    .post(coursesPolicy.isAllowed, courseAssignments.create);

  app.route('/api/assignments/:assignmentId')
    .get(courseAssignments.read)
    .put(coursesPolicy.isAllowed, courseAssignments.update)
    .delete(coursesPolicy.isAllowed, courseAssignments.delete);

  // Finish by binding the Course middleware
  app.param('courseId', courses.courseByID);
  app.param('assignmentId', courseAssignments.assignmentByID);
};
