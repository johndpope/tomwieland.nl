dependencies = require('../../package.json').dependencies;

{ exists } = require \fs

browserify          = require \browserify
browserify-hmr      = require \browserify-hmr
gulp                = require \gulp
gulp-util           = require \gulp-util
minimatch           = require \minimatch
vinyl-source-stream = require \vinyl-source-stream
watchify            = require \watchify
{ keys }            = require \lodash

handle-error = require \../lib/handle-error

dependencies = keys dependencies

gulp.task \browserify:compile, (cb) ->
  application-bundle-entry-filename   = "app.js"
  application-bundle-target-filename  = "app.bundle.js"
  dependencies-bundle-target-filename = "node_modules.bundle.js"
  source-directory-path               = "build/client/js"
  target-directory-path               = "build/client/js"

  run-bundle = (bundle, file-name, directory-path, cb) ->
    gulp-util.log \browserify:compile, "Starting #{file-name}"

    bundle
      .bundle!
      .on \error, handle-error.bind void, \browserify:compile
      .pipe vinyl-source-stream file-name
      .pipe gulp.dest directory-path
      .on \end ->
        gulp-util.log \browserify:compile, "Finished #{file-name}"
        cb!

  application-bundle-entry-file-path = "#{source-directory-path}/#{application-bundle-entry-filename}"

  does-exist <- exists application-bundle-entry-file-path

  if not does-exist
    gulp-util.log \browserify:compile, "Warning: Path does not exist #{application-bundle-entry-file-path}"
    cb!

  application-bundle = browserify do
    entries: [ application-bundle-entry-file-path ]

  dependencies-bundle = browserify!

  application-bundle.on \file, (file-path, id, parent) ->
    if minimatch file-path, '**/node_modules/**'
      application-bundle.external file-path
      application-bundle.external id
      dependencies-bundle.require file-path, expose: id

  run-bundle application-bundle, application-bundle-target-filename, target-directory-path, ->
    run-bundle dependencies-bundle, dependencies-bundle-target-filename, target-directory-path, cb

gulp.task \browserify:watch, (cb) ->
  application-bundle-entry-filename   = 'app.js'
  application-bundle-target-filename  = 'app.bundle.js'
  dependencies-bundle-target-filename = 'node_modules.bundle.js'
  source-directory-path               = "build/client/js"
  target-directory-path               = "build/client/js"

  run-bundle = (bundle, file-name, directory-path, cb) ->
    gulp-util.log \browserify:watch, "Starting #{file-name}"

    bundle
      .bundle!
      .on \error, handle-error.bind void, \browserify:watch
      .pipe vinyl-source-stream file-name
      .pipe gulp.dest directory-path
      .on \end ->
        gulp-util.log \browserify:watch, "Finished #{file-name}"
        cb!

  application-bundle-entry-file-path = "#{source-directory-path}/#{application-bundle-entry-filename}"

  does-exist <- exists application-bundle-entry-file-path

  if not does-exist
    gulp-util.log \browserify:watch, "Warning: Path does not exist #{application-bundle-entry-file-path}"
    cb!

  application-bundle = watchify browserify do
    entries: [ application-bundle-entry-file-path ]
    debug: true

  dependencies-bundle = watchify browserify do
    debug: true

  application-bundle.plugin browserify-hmr,
    url: 'http://0.0.0.0:3123'
    port: 3123
    hostname: '0.0.0.0'

  application-bundle.on \file, (file-path, id, parent) ->
    if (dependencies.index-of id) > 0
      application-bundle.external file-path
      application-bundle.external id
      dependencies-bundle.require file-path, expose: id

  application-bundle.on \update, ->
    run-bundle application-bundle, application-bundle-target-filename, target-directory-path, ->

  application-bundle.on \log, gulp-util.log.bind gulp-util, \browserify:watch

  dependencies-bundle.on \update, ->
    run-bundle dependencies-bundle, dependencies-bundle-target-filename, target-directory-path, ->

  dependencies-bundle.on \log, gulp-util.log.bind gulp-util, \browserify:watch

  run-bundle application-bundle, application-bundle-target-filename, target-directory-path, ->
    run-bundle dependencies-bundle, dependencies-bundle-target-filename, target-directory-path, cb
