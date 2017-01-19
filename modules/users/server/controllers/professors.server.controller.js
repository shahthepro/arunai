'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Course = mongoose.model('Course'),
  CourseAssignment = mongoose.model('CourseAssignment'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Add a Professor
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
  user.roles = ['professor'];
  if (req.body.roles !== undefined && Array.isArray(req.body.roles) && req.body.roles.indexOf('hod') >= 0 && req.user.roles.indexOf('admin') >= 0) {
    user.roles.push('hod');
  }
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
 * List of Professors
 */
exports.list = function (req, res) {
  // TODO dept wise filter
  User.find({ roles: { $in: ['professor'] } }, '-salt -password -providerData').sort('displayName').populate('department').exec(function (err, users) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(users);
  });
};

/**
 * Show the current professor
 */
exports.read = function (req, res) {
  res.json(req.model);
};

/**
 * Update a User
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
 * Get assigned courses
 */
exports.getAssignedCourses = function(req, res) {
  var user = req.model;
  CourseAssignment.find({ professor: user._id }).lean().sort('name').populate('course').exec(function(err, courses) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(courses);
    }
  });
};
