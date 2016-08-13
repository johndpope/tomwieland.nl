gulp = require \gulp

compile = require \./compile
watch   = require \./watch

gulp.task \browserify:compile, compile
gulp.task \browserify:watch, watch
