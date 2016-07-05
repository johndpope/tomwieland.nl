LessPluginAutoprefix    = require \less-plugin-autoprefix
gulp                    = require \gulp
gulp-cssnano            = require \gulp-cssnano
gulp-less               = require \gulp-less
gulp-sane-watch         = require \gulp-sane-watch
gulp-util               = require \gulp-util
less-plugin-inline-urls = require \less-plugin-inline-urls

log = require \../lib/log

gulp.task \less:compile, (cb) ->
  source-file-path      = "src/client/styles/app.less"
  target-directory-path = "build/client/css"

  gulp
    .src source-file-path
    .pipe gulp-less do
      plugins: [
        new LessPluginAutoprefix browsers: ["last 2 versions"]
        less-plugin-inline-urls
      ]
    .pipe gulp-cssnano!
    .pipe gulp.dest target-directory-path
    .pipe log.file \less:compile

gulp.task \less:watch, (cb) !->
  debounce              = 300
  source-file-path      = "src/client/styles/app.less"
  source-path           = "src/client/styles/**/*.less"
  target-directory-path = "build/client/css"

  gulp-sane-watch source-path, debounce: debounce, !->
    gulp
      .src source-file-path
      .pipe gulp-less do
        plugins: [
          new LessPluginAutoprefix browsers: ["last 2 versions"]
          less-plugin-inline-urls
        ]
      .pipe gulp-cssnano!
      .pipe gulp.dest target-directory-path
      .pipe log.file \less:watch

  cb!
