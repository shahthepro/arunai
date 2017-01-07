'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  UserMeta = mongoose.model('UserMeta'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Add a metadata
 */
exports.add = function (req, res) {

//   if (!req.user) {
//     res.status(403).send({
//       message: 'Unauthorized access'
//     });
//   }

  var metadata = new UserMeta(req.body);
  metadata.user = req.model;

  metadata.save(function (err) {
    if (err) {
      console.log(err);
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(metadata);
  });
};

/**
 * List of metadata
 */
exports.list = function (req, res) {
  // TODO dept wise filter
  UserMeta.find({ user: req.model._id }).sort('metaKey').populate('user').exec(function (err, metadata) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(metadata);
  });
};

/**
 * Show the current meta
 */
exports.read = function (req, res) {
  res.json(req.metadata);
};

/**
 * Update a UserMeta
 */
exports.update = function (req, res) {
  var metadata = new UserMeta(req.body);
  metadata.user = req.model;
  metadata.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(metadata);
  });
};

/**
 * Delete a usermeta
 */
exports.delete = function (req, res) {
  var metadata = req.metadata;

  metadata.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(metadata);
  });
};


/**
 * User middleware
 */
exports.metadataByKey = function (req, res, next, id) {
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).send({
//       message: 'Metadata is invalid'
//     });
//   }

  UserMeta.findOne({
    metaKey: id
  }).populate('user').exec(function (err, usermeta) {
    if (err) {
      return next(err);
    } else if (!usermeta) {
      return next(new Error('Failed to load meta data ' + id));
    }

    req.metadata = usermeta;
    next();
  });
};
