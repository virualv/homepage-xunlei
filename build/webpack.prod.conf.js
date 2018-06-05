const path = require('path')
const webpack = require('webpack')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const origin = 'file:///D:/wenyi/projects/homepage-xunlei/dist'
// const origin = 'https://yshenhua.github.io/homepage-xunlei'

const extractCss = new ExtractTextWebpackPlugin('css/vendor/jquery.fullpage.min.[contenthash:5].css')
const extractScss = new ExtractTextWebpackPlugin('css/[name]-bundle-[contenthash:5].css')

module.exports = {
  entry: {
    'jquery': ['jquery'],
    'fullpage.js': ['fullpage.js']
  },

  output: {
    publicPath: origin + '/'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.scss$/,
        use: extractCss.extract({
          fallback: { loader: 'style-loader' },
          use: [
            {
              loader: 'css-loader',
              options: { minimize: true }
            },
          ]
        })
      },

      {
        test: /\.scss$/,
        use: extractScss.extract({
          fallback: {
            loader: 'style-loader'
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('postcss-cssnext')
                ]
              }
            },
            {
              loader: 'sass-loader'
            },
          ]
        })
      },

    ]
  },

  plugins: [
    new webpack.NamedChunksPlugin(),
    new webpack.NamedModulesPlugin(),

    extractCss,
    extractScss,

    new webpack.optimize.CommonsChunkPlugin({
      names: ['fullpage.js', 'jquery', 'manifest'],
      filename: 'js/vendor/[name].min.[chunkhash:5].js',
      minChunks: Infinity
    }),

    new webpack.optimize.UglifyJsPlugin(),

    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../')
    }),

  ]
}