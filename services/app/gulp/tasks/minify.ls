gulp         = require \gulp
gulp-changed = require \gulp-changed
gulp-htmlmin = require \gulp-htmlmin
gulp-uglify  = require \gulp-uglify

log = require \../lib/log

gulp.task \html:minify, (cb) ->
  source-path           = "build/client/*.html"
  target-directory-path = "build/client/js"

  gulp
    .src source-path
    .pipe gulp-htmlmin do
       collapse-whitespace:              true
       remove-attribute-quotes:          true
       remove-CDATA-sections-from-CDATA: true
       remove-comments-from-CDATA:       true
       remove-comments:                  true
       remove-redundant-attributes:      true
       use-short-doctype:                true
    .pipe gulp.dest target-directory-path
    .pipe log.file \html:minify

gulp.task \javascript:minify, (cb) ->
  source-path           = "src/client/js/app.bundle.js"
  target-directory-path = "build/client/js"

  gulp
    .src source-path
    .pipe gulp-uglify!
    .pipe gulp.dest target-directory-path
    .pipe log.file \javascript:minify
