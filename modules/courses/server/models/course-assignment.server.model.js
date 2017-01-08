'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * CourseAssignment Schema
 */
var CourseAssignmentSchema = new Schema({
  course: {
    type: Schema.ObjectId,
    ref: 'Course'
  },
  professor: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  batch: {
    type: Number,
    required: 'Please fill in a batch'
  }
});

mongoose.model('CourseAssignment', CourseAssignmentSchema);
