'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Add a Student
 */
exports.add = function (req, res) {

  if (!req.user) {
    res.status(403).send({
      message: 'Unauthorized access'
    });
  }

  var user = new User(req.body);
  user.provider = 'local';
  user.displayName = user.firstName + ' ' + user.lastName;
  user.password = user.username + '#1PASS';
  user.roles = ['student'];
  if (req.user.roles.indexOf('admin') === -1) {
    user.department = req.user.department._id;
  }

  user.save(function (err) {
    if (err) {
      console.log(err);
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * List of Students
 */
exports.list = function (req, res) {
  // TODO dept wise filter
  User.find({ roles: { $in: ['student'] } }, '-salt -password -providerData').sort('displayName').populate('department').exec(function (err, users) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(users);
  });
};

/**
 * Show the current student
 */
exports.read = function (req, res) {
  res.json(req.model);
};

/**
 * Update a Student
 */
exports.update = function (req, res) {
  var user = req.model;

  // For security purposes only merge these parameters
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.displayName = user.firstName + ' ' + user.lastName;
  user.roles = req.body.roles;
  user.email = req.body.email;
  user.username = req.body.username;
  user.metaData = req.body.metaData;
  user.markModified('metaData');
  user.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * Delete a user
 */
exports.delete = function (req, res) {
  var user = req.model;

  user.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * Filter students by department, batch and semester
 */
exports.filterStudents = function (req, res) {
  var department = req.params.departmentId,
    batch = parseInt(req.params.batch, 10),
    semester = parseInt(req.params.semester, 10);

  User.find({ roles: { $in: ['student'] }, department: department, 'metaData.batch': batch, 'metaData.semester': semester }, '-salt -password -providerData').sort('displayName').exec(function (err, users) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(users);
  });
};
