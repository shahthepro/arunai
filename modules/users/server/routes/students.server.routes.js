'use strict';

module.exports = function (app) {
  // User Routes
  var studentsPolicy = require('../policies/students.server.policy'),
    students = require('../controllers/students.server.controller');

  // Setting up the students api
  app.route('/api/students')
    .get(students.list)
    .post(studentsPolicy.isAllowed, students.add);

  app.route('/api/students/:userId')
    .get(students.read)
    .put(studentsPolicy.isAllowed, students.update)
    .delete(studentsPolicy.isAllowed, students.delete);

  app.route('/api/students/:departmentId/:batch/:semester')
    .get(students.filterStudents);
};
