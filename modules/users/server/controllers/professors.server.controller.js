'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Update a User
 */
exports.add = function (req, res) {

//   var user = req.model;

  if (!req.user) {
    res.status(403).send({
      message: 'Unauthorized access'
    });
  }

  var user = new User(req.body);
  // console.log('Request >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', req.body);
  user.provider = 'local';
  user.displayName = user.firstName + ' ' + user.lastName;
  user.password = user.username + '#1PASS';
  user.roles = ['professor'];
  if (req.user.roles.indexOf('admin') === -1) {
    user.department = req.user.department;
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

//   // For security purposes only merge these parameters
//   user.firstName = req.body.firstName;
//   user.lastName = req.body.lastName;
//   user.displayName = user.firstName + ' ' + user.lastName;
//   user.roles = req.body.roles;

//   user.save(function (err) {
//     if (err) {
//       return res.status(422).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     }

//     res.json(user);
//   });
};

/**
 * List of Users
 */
exports.list = function (req, res) {
  console.log(req.user);
  User.find({ roles: { $in: ['professor'] } }, '-salt -password -providerData').sort('displayName').populate('userMeta').exec(function (err, users) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(users);
  });
};