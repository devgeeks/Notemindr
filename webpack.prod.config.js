/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var definePlugin = new webpack.DefinePlugin({
  __PRODUCTION__: 'true',
  __CRYPTON_HOST__: '"encryptrservice.crypton.io"',
  __CRYPTON_PORT__: '443'
});
var lessLoaders = [
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
        loader: ExtractTextPlugin.extract(lessLoaders.join('!')),
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
    new ExtractTextPlugin('dist/css/index.css'),
    definePlugin
  ]
};
