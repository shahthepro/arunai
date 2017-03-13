'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Sidebar = mongoose.model('Sidebar'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Sidebar
 */
exports.create = function(req, res) {
  var sidebar = new Sidebar(req.body);
  sidebar.user = req.user;

  sidebar.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(sidebar);
    }
  });
};

/**
 * Show the current Sidebar
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var sidebar = req.sidebar ? req.sidebar.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  sidebar.isCurrentUserOwner = req.user && sidebar.user && sidebar.user._id.toString() === req.user._id.toString();

  res.jsonp(sidebar);
};

/**
 * Update a Sidebar
 */
exports.update = function(req, res) {
  var sidebar = req.sidebar;

  sidebar = _.extend(sidebar, req.body);

  sidebar.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(sidebar);
    }
  });
};

/**
 * Delete an Sidebar
 */
exports.delete = function(req, res) {
  var sidebar = req.sidebar;

  sidebar.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(sidebar);
    }
  });
};

/**
 * List of Sidebars
 */
exports.list = function(req, res) {
  Sidebar.find().sort('-created').populate('user', 'displayName').exec(function(err, sidebars) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(sidebars);
    }
  });
};

/**
 * Sidebar middleware
 */
exports.sidebarByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Sidebar is invalid'
    });
  }

  Sidebar.findById(id).populate('user', 'displayName').exec(function (err, sidebar) {
    if (err) {
      return next(err);
    } else if (!sidebar) {
      return res.status(404).send({
        message: 'No Sidebar with that identifier has been found'
      });
    }
    req.sidebar = sidebar;
    next();
  });
};
