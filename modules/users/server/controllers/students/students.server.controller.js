'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  multer = require('multer'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Update a User
 */
exports.add = function (req, res) {

//   var user = req.model;

  if(!req.user) {
    res.status(403).send({
      message: 'You need to be logged in'
    });
  }
  var upload = multer({ storage: multer.memoryStorage({}), dest: './public/uploads' }).single('csvFile');
  upload(req, res, function (uploadError) {
    if(uploadError) {
      res.status(400).send({
        message: 'Something went wrong :('
      });
    }
    var data = req.file.buffer.toString().split('\r\n').splice(0, 1);
    data.forEach(function(item, index) {
      // te
      fields = data.split(',');
      var userData = {
        firstName: fields[0],
        lastName: fields[1],
        username: fields[2],
        password: fields[2] + '#1PASS',
        //TODO
      }
    });
    res.status(200);
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
  User.find({ roles: { $in: ['student'] } }, '-salt -password -providerData').sort('displayName').populate('userMeta').exec(function (err, users) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(users);
  });
};
