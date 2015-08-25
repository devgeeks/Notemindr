/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var webpack = require('webpack');
var definePlugin = new webpack.DefinePlugin({
  __PRODUCTION__: 'true',
  __CRYPTON_HOST__: '"encryptrstaging.crypton.io"',
  __CRYPTON_PORT__: '443'
});
var lessLoaders = [
  'style',
  'css-loader',
  'autoprefixer-loader?browsers=last 3 versions',
  'less-loader'
];
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'dist/js/bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: lessLoaders.join('!'),
        exclude: /less_includes/
      },
      {
        test: /\.js$/,
        exclude: /node_modules|crypton\.js/,
        loader: 'babel-loader?stage=0'
      }
    ]
  },
  plugins: [
    definePlugin
  ]
};
