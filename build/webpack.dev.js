/* eslint import/no-extraneous-dependencies: 0 */
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const config = require('./config');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '..', 'dist'),
    compress: true,
    https: config.devServer.https,
    host: config.devServer.host,
    port: config.devServer.port,
  },
});
