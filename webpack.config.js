require('dotenv').config()
const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, 'src', 'client'),
  entry: path.resolve(__dirname, 'src', 'client', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'game.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|\.test.js$)/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
              outputPath: 'assets/css/'
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      PORT: 80
    })
  ]
}
