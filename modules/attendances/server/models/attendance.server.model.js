'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Attendance Schema
 */
var AttendanceSchema = new Schema({
  course: {
    type: Schema.ObjectId,
    ref: 'Course'
  },
  student: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date
  }
});

mongoose.model('Attendance', AttendanceSchema);
