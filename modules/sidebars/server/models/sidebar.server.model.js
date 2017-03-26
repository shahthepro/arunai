'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Sidebar Schema
 */
var SidebarSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Sidebar name',
    trim: true
  },
  widgets: [Schema.Types.Mixed]
});

mongoose.model('Sidebar', SidebarSchema);
