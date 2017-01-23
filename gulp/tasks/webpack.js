import gulp from 'gulp'
import gulpUtil from 'gulp-util'
import webpack from 'webpack'

import webpackConfig from '../../webpack.config'
import handleError from '../lib/handleError'

const HOST = process.env.IP || '0.0.0.0'
const PORT = process.env.PORT || 8080

const webpackServiceURI = `http://${HOST}:${PORT}`

gulp.task('webpack:compile', (cb) => {
  process.env.NODE_ENV = 'production'

  const config = Object.assign({}, webpackConfig)

  config.plugins = config.plugins.concat(
    new webpack.optimize.UglifyJsPlugin()
  )

  webpack(config, (e, stats) => {
    if (e) {
      throw new gulpUtil.PluginError('webpack:compile', e)
    }

    gulpUtil.log('webpack:compile', stats.toString({
      colors: true,
    }))

    cb()
  })
})
