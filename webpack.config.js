const path = require('path')

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
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader',
      },
      {
        test: /\.module.scss/,
        exclude: /node_modules/,
        loader: combineLoaders([
          {
            loader: 'style-loader',
            query: {
              sourceMap: false,
            },
          },
          {
            loader: 'css-loader',
            query: {
              modules: true,
              sourceMap: false,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
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
            loader: 'style-loader',
            query: {
              sourceMap: false,
            },
          },
          {
            loader: 'css-loader',
            query: {
              modules: false,
              sourceMap: false,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
            query: {
              sourceMap: false,
            },
          },
        ]),
      },
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.NamedModulesPlugin(),
  ],
}

module.exports = options

