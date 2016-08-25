{ dirname } = require \path

gulp            = require \gulp
gulp-changed    = require \gulp-changed
gulp-micromatch = require \gulp-micromatch
gulp-sane-watch = require \gulp-sane-watch
gulp-util       = require \gulp-util
rimraf          = require \rimraf
{ map }         = require \prelude-ls
{ parallel }    = require \async

gulp-debug = require \gulp-debug

handle-error = require \../lib/handle-error
log          = require \../lib/log

source-filter = (x) ->
  | x.match /\.gif$/  => false
  | x.match /\.jpg$/  => false
  | x.match /\.png$/  => false
  | x.match /\.svg$/  => false
  | x.match /\.less$/ => false
  | x.match /\.ls$/   => false
  | x.match /\.js$/   => false
  | otherwise         => true

gulp.task \copy:compile, (cb) ->
  source-paths = [
    {
      source-path:           "src/**/*"
      target-directory-path: "build"
    }
  ]

  copy-path = (path, cb) !-->
    gulp
      .src path.source-path
      .pipe gulp-micromatch source-filter, dot: true, extglobs: true
      .pipe gulp.dest path.target-directory-path
      .on \end, ->
        # Can't use log.file here.
        gulp-util.log \copy:compile, path.source-path
        cb!

  error <-! parallel map copy-path, source-paths

  return cb error if error

  cb!

gulp.task \copy:watch, (cb) !->
  debounce              = 300
  source-directory-path = "src"
  source-path           = "src/**/*"
  target-directory-path = "build"

  gulp-sane-watch source-path, debounce: debounce, (source-file-path) !->
    source-file-path = "#{source-directory-path}/#{source-file-path}"
    target-file-path = dirname source-file-path.replace source-directory-path, target-directory-path

    if source-filter source-file-path
      gulp
        .src  source-file-path
        .pipe gulp.dest target-file-path
        .pipe log.file \copy:watch

  cb!
