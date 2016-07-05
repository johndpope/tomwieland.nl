{ dirname } = require \path

gulp            = require \gulp
gulp-imagemin   = require \gulp-imagemin
gulp-sane-watch = require \gulp-sane-watch
gulp-util       = require \gulp-util
pngquant        = require \imagemin-pngquant

log = require \../lib/log

gulp.task \images:compile, (cb) ->
  source-directory-path = "src"
  source-path           = "src/**/*.@(gif|jpg|png|svg)"
  target-directory-path = "build"

  gulp
    .src source-path
    .pipe gulp-imagemin do
      progressive: true
      svgo-plugins: [
        remove-viewbox: false
      ]
      use: [ pngquant! ]
    .pipe gulp.dest target-directory-path
    .pipe log.file \images:compile

gulp.task \images:watch, (cb) !->
  debounce              = 300
  source-path           = "src/**/*.@(gif|jpg|png|svg)"
  target-directory-path = "build"

  gulp-sane-watch source-path, debounce: debounce, (source-file-path) !->
    source-file-path = "#{source-directory-path}/#{source-file-path}"
    target-file-path = dirname source-file-path.replace source-directory-path, target-directory-path

    gulp
      .src source-file-path
      .pipe gulp-imagemin do
        progressive: true
        svgo-plugins: [
          remove-viewbox: false
        ]
        use: [ pngquant! ]
      .pipe gulp.dest target-file-path
      .pipe log.file \images:watch

  cb!
