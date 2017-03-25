'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Assesment = mongoose.model('Assesment'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Assesment
 */
exports.create = function(req, res) {
  var assesment = new Assesment(req.body);

  assesment.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    Assesment.populate(assesment, { path: 'student course' }, function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      res.jsonp(assesment);
    });
  });
};

/**
 * Show the current Assesment
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var assesment = req.assesment ? req.assesment.toJSON() : {};

  res.jsonp(assesment);
};

/**
 * Update a Assesment
 */
exports.update = function(req, res) {
  var assesment = req.assesment;

  assesment = _.extend(assesment, req.body);

  assesment.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    Assesment.populate(assesment, { path: 'student course' }, function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      res.jsonp(assesment);
    });
  });
};

/**
 * Delete an Assesment
 */
exports.delete = function(req, res) {
  var assesment = req.assesment;

  assesment.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(assesment);
    }
  });
};

/**
 * List of Assesments
 */
exports.list = function(req, res) {
  Assesment.find().sort('name').exec(function(err, assesments) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(assesments);
    }
  });
};

/**
 * Assesment middleware
 */
exports.assesmentByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Assesment is invalid'
    });
  }

  Assesment.findById(id).populate('student course').exec(function (err, assesment) {
    if (err) {
      return next(err);
    } else if (!assesment) {
      return res.status(404).send({
        message: 'No Assesment with that identifier has been found'
      });
    }
    req.assesment = assesment;
    next();
  });
};

/**
 * Filter assesments by department, batch and semester
 */
exports.getAssesments = function (req, res) {
  var course = req.course,
    department = course.department,
    semester = course.semester,
    batch = parseInt(req.params.batch, 10),
    test = req.params.test;

  Assesment.find({ test: test }).populate('student', null, { roles: { $in: ['student'] }, department: department, 'metaData.batch': batch, 'metaData.semester': semester }).exec(function (err, assesments) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(assesments);
  });
};

/**
 * Filter assesments by student
 */
exports.getByStudent = function (req, res) {
  var student = req.user;

  Assesment.find({ 'student': student }).populate('course', null, { semester: student.metaData.semester }).exec(function (err, assesments) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    if (assesments.length <= 0) {
      // TODO: Upsert records
    }
    res.json(assesments);
  });
};
