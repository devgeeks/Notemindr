var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  hot: true,
  contentBase: 'dist',
  publicPath: config.output.publicPath
}).listen(3000, 'localhost');
