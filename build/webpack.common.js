/* eslint import/no-extraneous-dependencies: 0 */
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackGitHash = require('webpack-git-hash');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: path.join(__dirname, '..', 'src', 'index.jsx'),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        loader: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        sideEffects: true,
        use: [
          devMode
            ? {
              loader: 'style-loader',
              options: {
                sourceMap: devMode,
              },
            } : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: devMode,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: devMode,
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: devMode,
              resources: [
                path.join(__dirname, '../src/styles/variables.scss'),
              ],
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        include: [
          path.resolve(__dirname, '../src/assets/fonts'),
        ],
        exclude: path.resolve(__dirname, '../src/assets/images'),
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        }],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        include: [
          path.resolve(__dirname, '../src/assets/images'),
        ],
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        }],
      },
    ],
  },
  plugins: [
    // new WebpackGitHash(),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      path.resolve(__dirname, '../src/assets/images'),
    ]),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].min.css',
      chunkFilename: devMode ? '[id].css' : '[id].min.css',
    }),
    new LodashModuleReplacementPlugin({
      currying: true,
      shorthands: true,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'src', 'assets', 'index.html'),
      files: {
        js: [
          path.join(__dirname, '..', 'src', 'index.jsx'),
        ],
        chunks: {
          main: {
            entry: path.join(__dirname, '..', 'src', 'index.jsx'),
          },
        },
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
  output: {
    filename: devMode ? '[name].js' : '[name].min.js',
    chunkFilename: devMode ? '[id].js' : '[id].min.js',
    path: path.join(__dirname, '..', 'dist'),
  },
  resolve: {
    alias: {
      // 'lodash-es': 'lodash',
      $helpers: path.resolve(__dirname, '../src/helpers'),
      $assets: path.resolve(__dirname, '../src/assets'),
      $store: path.resolve(__dirname, '../src/state/store'),
      $state: path.resolve(__dirname, '../src/state'),
      $services: path.resolve(__dirname, '../src/services'),
      $constants: path.resolve(__dirname, '../src/constants'),
      $components: path.resolve(__dirname, '../src/components'),
    },
    extensions: ['.js', '.jsx', '.json', '.sass', '.scss', '.svg'],
  },
  // stats: 'minimal',
};
