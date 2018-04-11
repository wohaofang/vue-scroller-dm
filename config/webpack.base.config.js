var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var outputFile = 'vue-super-scroller'
var globalName = 'VueScroller'

var config = require('../package.json')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: outputFile + '.js',
    library: globalName,
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader')
      }
    ]
  },
  externals: {
    // Put external libraries like lodash here
  },
  plugins: [
    new webpack.DefinePlugin({
      'VERSION': JSON.stringify(config.version)
    }),
    new ExtractTextPlugin(outputFile + '.css')
  ]
}
