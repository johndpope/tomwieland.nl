# TODO: Use !->

{ resolve } = require \path
{ spawn }   = require \child_process

handle-error = require \../lib/handle-error

gulp            = require \gulp
gulp-istanbul   = require \gulp-istanbul
gulp-micromatch = require \gulp-micromatch
gulp-mocha      = require \gulp-mocha
gulp-plumber    = require \gulp-plumber
gulp-sane-watch = require \gulp-sane-watch

gulp.task \mocha:istanbul, (cb) !->
  coverage-directory-path = ".tmp/istanbul-coverage"
  reporter                = "spec"
  source-filter           = (x) -> not x.match /\.test\.js$/
  source-path             = "build/**/*.js"
  test-source-filter      = (x) -> x.match /\.test\.js$/
  test-source-path        = "build/**/*.js"

  prepare-source = (cb) !->
    gulp.src source-path
      .pipe gulp-micromatch source-filter
      .pipe gulp-istanbul!
      .pipe gulp-istanbul.hook-require!
      # I'm not sure but I need a data handler here for end to be called.
      .on \data !->
      .on \end, cb

  run-tests = (cb) !->
    gulp.src test-source-path
      .pipe gulp-micromatch test-source-filter
      .pipe gulp-plumber!
      .pipe gulp-mocha do
        reporter: reporter
      .pipe gulp-istanbul.write-reports do
        dir: coverage-directory-path
      .on \end, cb

  <-! prepare-source
  <-! run-tests
  cb!

gulp.task \mocha:watch, (cb) !->
  debounce              = 300
  reporter              = "spec"
  source-directory-path = "build"
  source-filter         = (x) -> x
  source-path           = "build/**/*.js"
  test-source-filter    = (x) -> x.match /\.test\.js$/
  test-source-path      = "build/**/*.js"

  gulp-sane-watch source-path, debounce: debounce, !->
    gulp.src test-source-path
      .pipe gulp-micromatch test-source-filter
      .pipe gulp-plumber!
      .pipe gulp-mocha do
        reporter: reporter

  cb!
