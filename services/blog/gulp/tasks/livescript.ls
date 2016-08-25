{ create-read-stream } = require \fs
{ dirname }            = require \path

gulp            = require \gulp
gulp-livescript = require \gulp-livescript
gulp-sane-watch = require \gulp-sane-watch
gulp-util       = require \gulp-util

handle-error = require \../lib/handle-error

log = require \../lib/log

gulp.task \livescript:compile, (cb) ->
  source-directory-path = "src"
  source-path           = "src/**/*.ls"
  target-directory-path = "build"

  gulp
    .src source-path
    .pipe gulp-livescript!
    .on \error, (error) ->
      handle-error \livescript:compile, error
      cb!
    .pipe gulp.dest target-directory-path
    .pipe log.file \livescript:compile

gulp.task \livescript:watch, (cb) !->
  debounce              = 300
  source-directory-path = "src"
  source-path           = "src/**/*.ls"
  target-directory-path = "build"

  gulp-sane-watch source-path, debounce: debounce, (source-file-path) !->
    source-file-path = "#{source-directory-path}/#{source-file-path}"
    target-file-path = dirname source-file-path.replace source-directory-path, target-directory-path

    gulp
      .src source-file-path
      .pipe gulp-livescript!
      .on \error, (error) ->
        handle-error \livescript:compile, error
        cb!
      .pipe gulp.dest target-file-path
      .pipe log.file \livescript:watch


  cb!
