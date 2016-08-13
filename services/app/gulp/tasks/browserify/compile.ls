{ exists } = require \fs

gulp-util = require \gulp-util

common       = require \./common
handle-error = require \../../lib/handle-error

module.exports = (cb) ->
  bundle-entry-filename  = "loopback-app.js"
  bundle-target-filename = "loopback-app.bundle.js"
  source-directory-path  = "build/client/js"
  target-directory-path  = "build/client"

  bundle-entry-file-path = "#{source-directory-path}/#{bundle-entry-filename}"

  does-exist <- exists bundle-entry-file-path

  if not does-exist
    gulp-util.log \browserify:compile, "Warning: Path does not exist #{bundle-entry-file-path}"
    cb!

  bundle = common.get-bundle target-directory-path, bundle-entry-file-path

  common.run-bundle bundle, bundle-target-filename, target-directory-path, cb
