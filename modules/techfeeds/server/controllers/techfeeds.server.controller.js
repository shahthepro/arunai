'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  TechFeed = mongoose.model('TechFeed'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a TechFeed
 */
exports.create = function(req, res) {
  var techFeed = new TechFeed(req.body);
  techFeed.user = req.user;

  techFeed.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(techFeed);
    }
  });
};

/**
 * Show the current TechFeed
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var techFeed = req.techFeed ? req.techFeed.toJSON() : {};

  res.jsonp(techFeed);
};

/**
 * Update a TechFeed
 */
exports.update = function(req, res) {
  var techFeed = req.techFeed;

  techFeed = _.extend(techFeed, req.body);

  techFeed.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(techFeed);
    }
  });
};

/**
 * Delete an TechFeed
 */
exports.delete = function(req, res) {
  var techFeed = req.techFeed;

  techFeed.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(techFeed);
    }
  });
};

/**
 * List of TechFeeds
 */
exports.list = function(req, res) {
  TechFeed.find().sort('-created').exec(function(err, techFeeds) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(techFeeds);
    }
  });
};

/**
 * List of TechFeeds by status
 */
exports.listByStatus = function(req, res) {

  TechFeed.find({ approved: (req.params.approvalStatus === 'approved') }).sort('-created').exec(function(err, techFeeds) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(techFeeds);
    }
  });
};

/**
 * List of TechFeeds by category
 */
exports.listByCategory = function(req, res) {

  TechFeed.find({ category: req.params.category }).sort('-created').exec(function(err, techFeeds) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(techFeeds);
    }
  });
};

/**
 * TechFeed middleware
 */
exports.techFeedByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'TechFeed is invalid'
    });
  }

  TechFeed.findById(id).exec(function (err, techFeed) {
    if (err) {
      return next(err);
    } else if (!techFeed) {
      return res.status(404).send({
        message: 'No TechFeed with that identifier has been found'
      });
    }
    req.techFeed = techFeed;
    next();
  });
};

/**
 * Approve TechFeed
 */
exports.approveFeed = function(req, res) {
  var techFeed = req.techFeed;

  techFeed.approved = true;

  techFeed.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(techFeed);
    }
  });
};

/**
 * Disapprove TechFeed
 */
exports.disapproveFeed = function(req, res) {
  var techFeed = req.techFeed;

  techFeed.approved = false;

  techFeed.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(techFeed);
    }
  });
};
