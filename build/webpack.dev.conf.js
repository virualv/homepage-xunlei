module.exports = {
  devtool: 'cheap-module-source-map',

  devServer: {
    port: 3000,
    overlay: true,
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('postcss-cssnext')
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          },
        ]
      },
    ]
  },

  plugins: [

  ]
}