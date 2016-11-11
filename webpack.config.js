const path = require('path')

const WriteFilePlugin = require('write-file-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const combineLoaders = require('webpack-combine-loaders')
const webpack = require('webpack')

const entryFileName = 'index.js';
const bundleFileName = 'app.bundle.js';
const contentBaseDirectoryPath = path.join(__dirname, 'build/client');
const javascriptDirectoryPath = path.join(contentBaseDirectoryPath, 'js');

const webpackServiceURI = 'http://0.0.0.0:8080';
const applicationServiceURI = 'http://0.0.0.0:3000';

const options = {
  context: contentBaseDirectoryPath,

  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?${webpackServiceURI}`, // WebpackDevServer host and port
    'webpack/hot/only-dev-server',                   // "only" prevents reload on syntax errors
    `${javascriptDirectoryPath}/${entryFileName}`,
  ],

  output: {
    publicPath: '/',
    path: contentBaseDirectoryPath,
    filename: bundleFileName,
  },

  devtool: '#source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json',
      },
      {
        test: /\.module.scss/,
        exclude: /node_modules/,
        loader: combineLoaders([
          {
            loader: 'style',
            query: {
              sourceMap: false,
            },
          },
          {
            loader: 'css',
            query: {
              modules: true,
              sourceMap: false,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'sass',
            query: {
              sourceMap: false,
            },
          },
        ]),
      },
      {
        test: /^((?!\.module).)*scss/,
        exclude: /node_modules/,
        loader: combineLoaders([
          {
            loader: 'style',
            query: {
              sourceMap: false,
            },
          },
          {
            loader: 'css',
            query: {
              modules: false,
              sourceMap: false,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'sass',
            query: {
              sourceMap: false,
            },
          },
        ]),
      },
    ],
  },

  plugins: [
    new WriteFilePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
}

console.log(JSON.stringify(options))

module.exports = options
