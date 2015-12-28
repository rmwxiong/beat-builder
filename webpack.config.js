'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: ['./src/main.js']
  },
  output: {
    path: require('path').resolve('public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.styl$/,
      loader: 'style-loader!css-loader!stylus-loader'
    }, {
      test: /\.js$/,
      exclude: /node_modules|vendor/,
      loader: 'babel-loader'
    }]
  },
  plugins: []
};
