{ exists } = require \fs

gulp-util = require \gulp-util
watchify  = require \watchify

common       = require \./common
handle-error = require \../../lib/handle-error

module.exports = (cb) ->
  bundle-entry-filename  = 'loopback-app.js'
  bundle-target-filename = 'loopback-app.bundle.js'
  source-directory-path  = "build/client/js"
  target-directory-path  = "build/client"

  bundle-entry-file-path = "#{source-directory-path}/#{bundle-entry-filename}"

  does-exist <- exists bundle-entry-file-path

  if not does-exist
    gulp-util.log \browserify:watch, "Warning: Path does not exist #{bundle-entry-file-path}"
    cb!

  bundle = watchify common.get-bundle target-directory-path, bundle-entry-file-path

  bundle.on \update, ->
    common.run-bundle bundle, bundle-target-filename, target-directory-path, ->

  bundle.on \log, gulp-util.log.bind gulp-util, \browserify:watch

  common.run-bundle bundle, bundle-target-filename, target-directory-path, cb
