'use strict';

/**
 * Module dependencies
 */
var attendancesPolicy = require('../policies/attendances.server.policy'),
  attendances = require('../controllers/attendances.server.controller'),
  courses = require('../../../courses/server/controllers/courses.server.controller');

module.exports = function(app) {
  // Attendances Routes
  app.route('/api/attendances')
    .get(attendances.list)
    .post(attendancesPolicy.isAllowed, attendances.create);

  app.route('/api/attendances/:attendanceId')
    .get(attendances.read)
    .put(attendancesPolicy.isAllowed, attendances.update)
    .delete(attendancesPolicy.isAllowed, attendances.delete);

  app.route('/api/attendances/:courseId/:batch/:date')
    .get(attendances.getAttendances);

  app.route('/api/attendances/:courseId/:batch/:fromDate/:toDate')
    .get(attendances.reportAttendances);

  app.route('/api/attendances/bystudent/:userId')
    .get(attendances.getByStudent);

  // Finish by binding the Attendance middleware
  app.param('attendanceId', attendances.attendanceByID);
  app.param('courseId', courses.courseByID);
};
