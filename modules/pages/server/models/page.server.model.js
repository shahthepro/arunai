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
  slug: {
    type: String,
    required: 'Please fill Page slug',
    unique: true,
    trim: true
  },
  content: {
    type: String,
    default: '',
    required: 'Please fill Page content',
    trim: true
  },
  showOnMenu: {
    type: Boolean,
    default: true
  },
  menuPosition: {
    type: Number,
    default: true
  },
  sidebar: {
    type: Schema.ObjectId,
    ref: 'Sidebar'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Page', PageSchema);
