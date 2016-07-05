gulp                = require \gulp
gulp-develop-server = require \gulp-develop-server
gulp-sane-watch     = require \gulp-sane-watch
gulp-util           = require \gulp-util

{ exists } = require \fs

gulp.task \server:run, (cb) ->
  debounce         = 300
  source-file-path = "build/server/server.js"
  watch-path       = "build/server/**/*"

  does-exist <- exists source-file-path

  if not does-exist
    gulp-util.log "Path `#{source-file-path}` does not exist."

  else
    gulp-develop-server.listen do
      path: source-file-path

    gulp-sane-watch watch-path, debounce: debounce, ->
      gulp-develop-server.restart!

  cb!
