'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Page Schema
 */
var PageSchema = new Schema({
  title: {
    type: String,
    default: '',
    required: 'Please fill Page title',
    trim: true
  },
  content: {
    type: String,
    default: '',
    required: 'Please fill Page content',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Page', PageSchema);
