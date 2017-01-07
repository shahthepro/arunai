'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Department Schema
 */
var DepartmentSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Department name',
    trim: true
  },
  code: {
    type: String,
    required: 'Please fill a department code',
    unique: true
  }
});

mongoose.model('Department', DepartmentSchema);
