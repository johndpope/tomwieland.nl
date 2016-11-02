const path = require('path')
const webpack = require('webpack')
const LoopbackBootPlugin = require('loopback-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')

const entryFileName = 'index.js';
const bundleFileName = 'app.bundle.js';
const contentBaseDirectoryPath = path.join(__dirname, 'build/client');
const javascriptDirectoryPath = path.join(contentBaseDirectoryPath, 'js');

const webpackServiceURI = 'http://0.0.0.0:8080';
const applicationServiceURI = 'http://0.0.0.0:3000';

const options = {
  context: contentBaseDirectoryPath,

  entry: {
    app: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?${webpackServiceURI}`, // WebpackDevServer host and port
      'webpack/hot/only-dev-server',                   // "only" prevents reload on syntax errors
      `${javascriptDirectoryPath}/${entryFileName}`,
    ],
  },

  output: {
    publicPath: '/',
    path: contentBaseDirectoryPath,
    filename: bundleFileName,
  },

  devtool: '#source-map',

  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json' },
      // { test: /\.css$/, loaders: ['style', 'css-loader?modules', 'postcss-loader'] },
    ],
  },

  plugins: [
    new LoopbackBootPlugin(),
    new WriteFilePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
}

module.exports = options
