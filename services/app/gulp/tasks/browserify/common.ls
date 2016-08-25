fs = require \fs

browserify    = require \browserify
exorcist      = require \exorcist
gulp          = require \gulp
gulp-util     = require \gulp-util
loopback-boot = require \loopback-boot

handle-error = require \../../lib/handle-error

bundle = void
get-bundle = (root-dir, entry-file-path)->
  if bundle isnt void
    return bundle

  bundle = browserify do
    entries: [ entry-file-path ]
    debug: true

  loopback-options =
    app-root-dir: "#{root-dir}/loopback"

  loopback-boot.compile-to-browserify loopback-options, bundle

  bundle

run-bundle = (bundle, file-name, directory-path, cb) ->
  gulp-util.log \browserify:compile, "Starting #{file-name}"

  map-file-name = file-name.replace '.js', '.map.js'

  bundle
    .bundle!
    .on \error, handle-error.bind void, \browserify:compile
    .pipe exorcist "#{directory-path}/#{map-file-name}"
    .pipe fs.create-write-stream "#{directory-path}/#{file-name}", \utf8
    .on \end ->
      gulp-util.log \browserify:compile, "Finished #{file-name}"
      cb!

module.exports =
  get-bundle: get-bundle
  run-bundle: run-bundle
