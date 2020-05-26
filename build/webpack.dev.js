/* eslint import/no-extraneous-dependencies: 0 */
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '..', 'docs'),
    compress: true,
    host: '192.168.1.74',
    port: 8080,
  },
});
