gulp      = require \gulp
gulp-util = require \gulp-util

WebpackDevServer = require \webpack-dev-server
webpack          = require \webpack

handle-error = require \../lib/handle-error

webpack-config = require \../../webpack.config

gulp.task \webpack:compile, (cb) !->
  config = Object.assign {}, webpack-config

  config.plugins = config.plugins.concat(
    new webpack.DefinePlugin do
      # TODO: Not sure why we need this. Docker Compose / Kubernetes should be
      #       concerned with it.
      'process.env':
        NODE_ENV: \production
    new webpack.optimize.DedupePlugin!
    new webpack.optimize.UglifyJsPlugin!
  )

  e, stats <-! webpack config

  if e
    throw new gulp-util.PluginError \webpack:compile, e

  gulp-util.log \webpack:compile, stats.toString colors: true

  cb!

gulp.task \webpack:dev-server, (cb) !->
  config = Object.assign {}, webpack-config

  config.dev-tool = \eval
  config.debug    = true

  # TODO: Put this outside of function
  compiler = webpack config

  dev-server-options =
    hot: true
    proxy:
      '*': 'http://0.0.0.0:3000'
    stats:
      colors: true

  if config.output.public-path
    dev-server-options.public-path = config.output.public-path

  if config.output.content-base
    dev-server-options.content-base = config.content-base

  dev-server = new WebpackDevServer compiler, dev-server-options

  e <-! dev-server.listen 8080, '0.0.0.0'

  if e
    throw new gulp-util.PluginError \webpack:dev-server, e

  gulp-util.log "http://0.0.0.0:8080/webpack-dev-server/index.html"

  cb!
