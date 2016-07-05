require('livescript');

var gulp = require('gulp');
var seq = require('run-sequence');

//require('./gulp/tasks/browserify');
require('./gulp/tasks/clean');
require('./gulp/tasks/copy');
require('./gulp/tasks/images');
require('./gulp/tasks/less');
require('./gulp/tasks/livescript');
require('./gulp/tasks/minify');
require('./gulp/tasks/mocha');
require('./gulp/tasks/server');
require('./gulp/tasks/webpack');

gulp.task('develop', function(cb) {
  seq(
    'clean',

    [
      'images:compile',
      'less:compile',
      'livescript:compile',
      'copy:compile',
    ],

    'mocha:istanbul',

    [
      'server:run',
      //'browserify:watch',
      'webpack:dev-server',
      'copy:watch',
      'images:watch',
      'less:watch',
      'livescript:watch',
      'mocha:watch'
    ],

    cb
  );
});

gulp.task('production', function(cb) {
  seq(
    'clean',

    [
      'images:compile',
      'less:compile',
      'livescript:compile',
      'copy:compile',
    ],

    //'browserify:compile',
    'webpack:compile',

    [
      'html:minify',
      'javascript:minify',
    ],

    'server:run',

    cb
  );
});
