'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * UserMeta Schema
 */
var UserMetaSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  metaKey: {
    type: String,
    required: true
  },
  metaValue: {
    type: Schema.Types.Mixed,
    required: true
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('UserMeta', UserMetaSchema);
