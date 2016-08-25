require('livescript');

var gulp = require('gulp');
var seq = require('run-sequence');

require('./gulp/tasks/clean');
require('./gulp/tasks/copy');
require('./gulp/tasks/livescript');
require('./gulp/tasks/mocha');
require('./gulp/tasks/server');

gulp.task('develop', function(cb) {
  seq(
    'clean',

    [
      'copy:compile',
      'livescript:compile',
    ],

    'mocha:istanbul',

    [
      'copy:watch',
      'livescript:watch',
      'mocha:watch',
      'server:run',
    ],

    cb
  );
});

gulp.task('production', function(cb) {
  seq(
    'clean',

    [
      'copy:compile',
      'livescript:compile',
    ],

    'server:run',

    cb
  );
});
