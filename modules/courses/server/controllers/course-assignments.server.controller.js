'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Course = mongoose.model('Course'),
  CourseAssignment = mongoose.model('CourseAssignment'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a CourseAssignment
 */
exports.create = function(req, res) {
  var assignment = new CourseAssignment(req.body);
  assignment.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(assignment);
    }
  });
};

/**
 * Show the current CourseAssignment
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var assignment = req.assignment ? req.assignment.toJSON() : {};

  res.jsonp(assignment);
};

/**
 * Update a CourseAssignment
 */
exports.update = function(req, res) {
  var assignment = req.assignment;
  assignment = _.extend(assignment, req.body);

  assignment.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(assignment);
    }
  });
};

/**
 * Delete an CourseAssignment
 */
exports.delete = function(req, res) {
  var assignment = req.assignment;

  assignment.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(assignment);
    }
  });
};

/**
 * List of CourseAssignments
 */
exports.list = function(req, res) {
  CourseAssignment.find().sort('name').populate('course').populate('professor').exec(function(err, courseAssignments) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(courseAssignments);
    }
  });
};

/**
 * CourseAssignment middleware
 */
exports.assignmentByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'CourseAssignment is invalid'
    });
  }

  CourseAssignment.findById(id).populate('course').populate('professor').exec(function (err, assignment) {
    if (err) {
      return next(err);
    } else if (!assignment) {
      return res.status(404).send({
        message: 'No Assignment with that identifier has been found'
      });
    }
    req.assignment = assignment;
    next();
  });
};
