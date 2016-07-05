var WriteFilePlugin = require('write-file-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  contentBase: `${__dirname}/build/client`,

  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server',                   // "only" prevents reload on syntax errors
    `${__dirname}/build/client/js/app.js`,
  ],

  output: {
    path: `${__dirname}/build/client`,
    filename: 'app.bundle.js',
  },

  // TODO: Just remove this.
  node: {
    fs: 'empty',
    tls: 'empty',
    net: 'empty',
  },

  module: {
    loaders: [
      { test: /\.js$/,   loaders: ['react-hot'], include: `${__dirname}/build` },
      { test: /\.json$/, loader: 'json' },
    ],
  },

  plugins: [
    new WriteFilePlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
