const gulp = require('gulp')
const seq = require('run-sequence')

require('babel-register')

require('./gulp/tasks/babel')
require('./gulp/tasks/clean')
require('./gulp/tasks/copy')
require('./gulp/tasks/mocha')
require('./gulp/tasks/server')
require('./gulp/tasks/webpack')

gulp.task('compile', cb => seq(
  [
    'babel:compile',
    'copy:compile',
  ],

  cb
))

gulp.task('watch', cb => seq(
  [
    'babel:watch',
    'copy:watch',
    'mocha:watch',
  ],

  cb
))

gulp.task('develop', cb => seq(
  'clean',
  'compile',
  'mocha:istanbul',

  [
    'watch',
    'server:run',

    'webpack:dev-server',
  ],

  cb
))

gulp.task('production', cb => seq(
  'clean',
  'compile',
  'webpack:compile',
  'server:run',

  cb
))
