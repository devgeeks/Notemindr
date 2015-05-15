var ExtractTextPlugin = require("extract-text-webpack-plugin");
var lessLoaders = [
  "css-loader",
  "autoprefixer-loader?browsers=last 2 version",
  "less-loader"
];
module.exports = {
  entry: "./src/app.js",
  output: {
    path: __dirname,
    filename: "www/js/notemindr.js"
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", lessLoaders.join('!')),
        exclude: /less_includes/
      },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?stage=1'}
    ]
  },
  plugins: [
    new ExtractTextPlugin("www/css/index.css")
  ]
};
