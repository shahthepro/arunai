'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * TechFeed Schema
 */
var TechFeedSchema = new Schema({
  title: {
    type: String,
    default: '',
    required: 'Please fill TechFeed title',
    trim: true
  },
  summary: {
    type: String,
    default: '',
    required: 'Please fill TechFeed summary',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('TechFeed', TechFeedSchema);
