'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  DateOnly = require('mongoose-dateonly')(mongoose);

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
    type: DateOnly
  },
  status: {
    type: Boolean
  }
});

mongoose.model('Attendance', AttendanceSchema);
