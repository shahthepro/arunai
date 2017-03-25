'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Attendance = mongoose.model('Attendance'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Attendance
 */
exports.create = function(req, res) {
  var attendance = new Attendance(req.body);

  attendance.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    Attendance.populate(attendance, { path: 'student course' }, function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      res.jsonp(attendance);
    });
  });
};

/**
 * Show the current Attendance
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var attendance = req.attendance ? req.attendance.toJSON() : {};

  res.jsonp(attendance);
};

/**
 * Update a Attendance
 */
exports.update = function(req, res) {
  var attendance = req.attendance;

  attendance = _.extend(attendance, req.body);

  attendance.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    Attendance.populate(attendance, { path: 'student course' }, function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      res.jsonp(attendance);
    });
  });
};

/**
 * Delete an Attendance
 */
exports.delete = function(req, res) {
  var attendance = req.attendance;

  attendance.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(attendance);
    }
  });
};

/**
 * List of Attendances
 */
exports.list = function(req, res) {
  Attendance.find().sort('name').exec(function(err, attendances) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(attendances);
    }
  });
};

/**
 * Attendance middleware
 */
exports.attendanceByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Attendance is invalid'
    });
  }

  Attendance.findById(id).populate('student course').exec(function (err, attendance) {
    if (err) {
      return next(err);
    } else if (!attendance) {
      return res.status(404).send({
        message: 'No Attendance with that identifier has been found'
      });
    }
    req.attendance = attendance;
    next();
  });
};

/**
 * Filter attendances by department, batch and semester
 */
exports.getAttendances = function (req, res) {
  var course = req.course,
    department = course.department,
    semester = course.semester,
    batch = parseInt(req.params.batch, 10),
    forDate = new Date(req.params.date * 1000);

  Attendance.find({ date: forDate }).populate('student', null, { roles: { $in: ['student'] }, department: department, 'metaData.batch': batch, 'metaData.semester': semester }).exec(function (err, attendances) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    if (attendances.length <= 0) {
      // TODO: Upsert records
    }
    res.json(attendances);
  });
};

/**
 * Filter attendances by student
 */
exports.getByStudent = function (req, res) {
  var student = req.user;

  Attendance.find({ 'student': student }).populate('course', null, { semester: student.metaData.semester }).exec(function (err, attendances) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    if (attendances.length <= 0) {
      // TODO: Upsert records
    }
    res.json(attendances);
  });
};


/**
 * Get attendance report between two dates
 */
exports.reportAttendances = function (req, res) {
  var course = req.course,
    department = course.department,
    semester = course.semester,
    batch = parseInt(req.params.batch, 10),
    fromDate = new Date(req.params.fromDate * 1000),
    toDate = new Date(req.params.toDate * 1000);

  Attendance.find({ date: { '$lte': toDate, '$gte': fromDate } })
  .populate('student', null, { roles: { $in: ['student'] }, department: department, 'metaData.batch': batch, 'metaData.semester': semester })
  .exec(function (err, attendances) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(attendances);
  });
};
