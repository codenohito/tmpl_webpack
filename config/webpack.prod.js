const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
});