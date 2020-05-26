/* eslint import/no-extraneous-dependencies: 0 */
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

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
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new GitRevisionPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.join(__dirname, '..', 'src', 'assets', 'images'), to: 'images' },
        { from: path.join(__dirname, '..', 'src', 'assets', 'manifest.json') },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name]-[git-revision-version].min.css',
      chunkFilename: devMode ? '[id].css' : '[id]-[git-revision-version].min.css',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'src', 'assets', 'index.html'),
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
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  output: {
    filename: devMode ? '[name].js' : '[name]-[git-revision-version].min.js',
    chunkFilename: devMode ? '[id].js' : '[id]-[git-revision-version].min.js',
    path: path.join(__dirname, '..', 'dist'),
  },
  resolve: {
    alias: {
      $helpers: path.resolve(__dirname, '../src/helpers'),
      $store: path.resolve(__dirname, '../src/state/store'),
      $state: path.resolve(__dirname, '../src/state'),
      $constants: path.resolve(__dirname, '../src/constants'),
      $components: path.resolve(__dirname, '../src/components'),
    },
    extensions: ['.js', '.jsx', '.scss'],
  },
  // stats: 'minimal',
};
