require('babel-register')

var gulp = require('gulp')
var seq = require('run-sequence')

require('./gulp/tasks/babel')
require('./gulp/tasks/clean')
require('./gulp/tasks/copy')
require('./gulp/tasks/mocha')
require('./gulp/tasks/server')

gulp.task('develop', function(cb) {
  seq(
    'clean',

    [
      'babel:compile',
      'copy:compile',
    ],

    'mocha:istanbul',

    [
      'babel:watch',
      'copy:watch',
      'mocha:watch',
      'server:run',
    ],

    cb
  )
})

gulp.task('production', function(cb) {
  seq(
    'clean',

    [
      'babel:compile',
      'copy:compile',
    ],

    'server:run',

    cb
  )
})
