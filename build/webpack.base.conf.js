const productionConfig = require('./webpack.prod.conf')
const developmentConfig = require('./webpack.dev.conf')

const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const generateConfig = env => {
  const cssLoaders = [
    {
      loader: 'css-loader',
      options: {
        minimize: env === 'production',
        sourceMap: env === 'development'
      }
    },

    {
      loader: 'postcss-loader',
      options: {
        sourceMap: env === 'development',
        plugins: [
          require('postcss-cssnext')
        ]/*.concat(env === 'development'
          ? []
          : [ require('postcss-sprites')({ spritePath: 'dist/assets/imgs/sprites' }) ]
        )*/
      }
    },

    {
      loader: 'sass-loader',
      options: {
        sourceMap: env === 'development'
      }
    }
  ]

  const styleLoader = env === 'development'
    ? [{
        loader: 'style-loader',
        options: {
          sourceMap: true
        }
      }
    ].concat(cssLoaders)
    : ExtractTextWebpackPlugin.extract({
      fallback: {
        loader: 'style-loader'
      },
      use: cssLoaders
    })

  const fileLoader = env === 'development'
    ? [{ loader: 'file-loader' } ]
    : [{
        loader: 'url-loader',
        options: {
          name: '[name]-[hash:5].[ext]',
          limit: 1000,
          outputPath: 'assets/imgs/'
        }
      },
      {
        loader: 'img-loader',
        options: {
          plugins: [
            require('imagemin-pngquant')({
              quality: 80
            }),
            require('imagemin-jpegoptim')({
              max: 80
            })
          ]
        }
      }
    ]

  const scriptLoader = [
    'babel-loader'
  ].concat(env === 'development'
    ? [{ loader: 'eslint-loader' }]
    : []
  )

  return {
    resolve: {
      alias: {
        jquery$: path.resolve(__dirname, '../src/libs/jquery/jquery.slim.min.js')
      }
    },

    entry: {
      app: './src/main.js'
    },

    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'js/[name]-bundle-[hash:5].js'
    },

    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: styleLoader
        },

        {
          test: /\.(jpe?g|png|gif)$/,
          use: fileLoader
        },
        
        {
          test: /\.js$/,
          include: [ path.resolve(__dirname, '../src') ],
          exclude: [ path.resolve(__dirname, '../src/libs') ],
          use: scriptLoader
        },
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        minify: {
          collapseWhitespace: true
        }
      }),

      new webpack.ProvidePlugin({
        $: 'jquery'
      })
    ]
  }
}

module.exports = env => {
  const config = env === 'production'
    ? productionConfig
    : developmentConfig
  
  return merge(generateConfig(env), config)
}