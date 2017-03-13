'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Slide = mongoose.model('Slide'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Slide
 */
exports.create = function(req, res) {
  var slide = new Slide(req.body);
  slide.user = req.user;

  slide.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(slide);
    }
  });
};

/**
 * Show the current Slide
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var slide = req.slide ? req.slide.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  slide.isCurrentUserOwner = req.user && slide.user && slide.user._id.toString() === req.user._id.toString();

  res.jsonp(slide);
};

/**
 * Update a Slide
 */
exports.update = function(req, res) {
  var slide = req.slide;

  slide = _.extend(slide, req.body);

  slide.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(slide);
    }
  });
};

/**
 * Delete an Slide
 */
exports.delete = function(req, res) {
  var slide = req.slide;

  slide.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(slide);
    }
  });
};

/**
 * List of Slides
 */
exports.list = function(req, res) {
  Slide.find().sort('-created').populate('user', 'displayName').exec(function(err, slides) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(slides);
    }
  });
};

/**
 * Slide middleware
 */
exports.slideByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Slide is invalid'
    });
  }

  Slide.findById(id).populate('user', 'displayName').exec(function (err, slide) {
    if (err) {
      return next(err);
    } else if (!slide) {
      return res.status(404).send({
        message: 'No Slide with that identifier has been found'
      });
    }
    req.slide = slide;
    next();
  });
};
