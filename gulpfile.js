require('babel-register')

var gulp = require('gulp')
var seq = require('run-sequence')

require('./gulp/tasks/babel')
require('./gulp/tasks/browserify')
require('./gulp/tasks/clean')
require('./gulp/tasks/copy')
require('./gulp/tasks/less')
require('./gulp/tasks/livescript')
require('./gulp/tasks/mocha')
require('./gulp/tasks/server')
require('./gulp/tasks/webpack')

gulp.task('compile', function(cb) {
  seq(
    [
      'babel:compile',
      'copy:compile',
      'less:compile',
    ],

    cb
  )
})

gulp.task('watch', function(cb) {
  seq(
    [
      'babel:watch',
      'copy:watch',
      'less:watch',
      'livescript:watch',
      'mocha:watch',
    ],

    cb
  )
})

gulp.task('develop', function(cb) {
  seq(
    'clean',
    'compile',
    'mocha:istanbul',

    [
      'watch',
      'server:run',

      'browserify:watch',
      'webpack:dev-server',
    ],

    cb
  )
})

gulp.task('production', function(cb) {
  seq(
    'clean',
    'compile',

    [
      'browserify:compile',
      'webpack:compile',
    ],

    'server:run',

    cb
  )
})
