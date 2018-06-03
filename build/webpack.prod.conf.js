const path = require('path')
const glob = require('glob-all')
const webpack = require('webpack')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
// const PurifyCSS = require('purifycss-webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const origin = 'file:///D:/wenyi/projects/homepage-xunlei/dist'

module.exports = {
  output: {
    publicPath: origin + '/'
  },

  plugins: [
    new ExtractTextWebpackPlugin({
      filename: 'css/[name]-bundle-[hash:5].css'
    }),

    // new PurifyCSS({
    //   minimize: true,
    //   paths: glob.sync([
    //     path.join(__dirname, '../*.html'),
    //     path.join(__dirname, '../src/*.js')
    //   ])
    // }),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['vender', 'manifest'],
      filename: 'js/vender/[name].min.js',
      minChunks: Infinity
    }),

    new webpack.optimize.UglifyJsPlugin(),

    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../')
    })
  ]
}