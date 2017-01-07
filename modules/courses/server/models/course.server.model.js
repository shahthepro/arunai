'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Course Schema
 */
var CourseSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Course name',
    trim: true
  },
  code: {
    type: String,
    default: '',
    required: 'Please fill Course code',
    trim: true
  },
  department: {
    type: Schema.ObjectId,
    ref: 'Department'
  },
  semester: {
    type: Number,
    required: 'Please fill the semester',
    trim: true
  }
});

mongoose.model('Course', CourseSchema);
