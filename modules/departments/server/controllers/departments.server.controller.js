'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Department = mongoose.model('Department'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Department
 */
exports.create = function(req, res) {
  var department = new Department(req.body);

  department.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(department);
    }
  });
};

/**
 * Show the current Department
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var department = req.department ? req.department.toJSON() : {};

  res.jsonp(department);
};

/**
 * Update a Department
 */
exports.update = function(req, res) {
  var department = req.department;

  department = _.extend(department, req.body);

  department.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(department);
    }
  });
};

/**
 * Delete an Department
 */
exports.delete = function(req, res) {
  var department = req.department;

  department.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(department);
    }
  });
};

/**
 * List of Departments
 */
exports.list = function(req, res) {
  Department.find().sort('name').exec(function(err, departments) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(departments);
    }
  });
};

/**
 * Department middleware
 */
exports.departmentByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Department is invalid'
    });
  }

  Department.findById(id).exec(function (err, department) {
    if (err) {
      return next(err);
    } else if (!department) {
      return res.status(404).send({
        message: 'No Department with that identifier has been found'
      });
    }
    req.department = department;
    next();
  });
};
