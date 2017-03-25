'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  DateOnly = require('mongoose-dateonly')(mongoose);

/**
 * Assesment Schema
 */
var AssesmentSchema = new Schema({
  course: {
    type: Schema.ObjectId,
    ref: 'Course'
  },
  student: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  test: {
    type: String
  },
  score: {
    type: Number,
    min: 0,
    max: 100
  }
});

mongoose.model('Assesment', AssesmentSchema);
