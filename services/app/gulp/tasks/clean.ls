gulp                   = require \gulp
gulp-util              = require \gulp-util
rimraf                 = require \rimraf
{ is-type, each, map } = require \prelude-ls
{ parallel }           = require \async

handle-error = require '../lib/handle-error'

remove-path = (path, cb) -->
  error <-!rimraf path

  return cb error if error

  gulp-util.log \clean, "Cleaned `#{path}`."

  cb!

gulp.task \clean, (cb) !->
  source-paths = [
    "build/*"
    ".tmp/*"
  ]

  error <-! parallel map remove-path, source-paths

  return cb error if error

  cb!
